import requests
BASE_URL = "http://localhost:9000"  # Change this to your API base URL

def print_result(test_name, passed, expected=None, got=None, request_data=None,
                 response_body=None):
    """
    Prints test result.
    If passed, prints only success.
    If failed, prints request, expected vs got, and response body.
    """
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")
def test_register_user():
    """
    Change payload keys/values as needed for your registration API.
    Expected status codes are 201 (created) or 409 (conflict if user exists).
    """
    payload = {"username": "Shubham", "password": "Hi"}  # Change username/password if needed
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)
def test_login():
    """
    Change payload for different username/password.
    On success, expects 200 status and an 'access_token' in JSON response.
    Returns the token for authenticated requests.
    """
    payload = {"username": "siddharth", "password": "123"}  # Change to test different login credentials
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False
    print_result("Login Test", passed, {"username": payload["username"], "password": 
    payload["password"]}, res.text, payload, res.text)
    return token

def test_add_product(token):
    """
    Change payload fields as per your product API requirements.
    Must include Authorization header with Bearer token.
    Returns product_id on success to be used in other tests.
    """
    payload = {
        "name": "Phone",           # Change product name
        "type": "Electronics",     # Change type/category
        "sku": "PHN-007",          # Change SKU if needed
        "image_url": "https://example.com/phone.jpg",  # Change image URL
        "description": "Latest Phone",                  # Change description
        "quantity": 5,             # Initial quantity
        "price": 999.99            # Price
    }
    res = requests.post(f"{BASE_URL}/products", json=payload, headers={"Authorization": f"Bearer {token}"})
    print(f"Response from Add Product: {res.text}")
    passed = res.status_code == 201
    if passed:
        print("Add Product: PASSED")
        try:
            return res.json().get("product_id")
        except Exception:
            return None
    else:
        print_result("Add Product", False, 201, res.status_code, payload, res.text)
        return None

def test_update_quantity(token, product_id, new_quantity):
    """
    Tests update quantity API for a specific product.
    Change endpoint if your API uses a different URL structure.
    Pass the product ID and the new quantity.
    """
    payload = {"quantity": new_quantity}  # Change field name if your API expects different key
    res = requests.put(
        f"{BASE_URL}/products/{product_id}/quantity",
        json=payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    passed = res.status_code == 200
    if passed:
        if res.text:
            try:
                updated_info = res.json()
                updated_qty = updated_info.get("quantity", "unknown")  # Change key if API uses a different key for quantity
                print(f"Update Quantity: PASSED, Updated quantity: {updated_qty}")
            except Exception:
                print("Update Quantity: PASSED, but response body is not valid JSON")
        else:
            print("Update Quantity: PASSED, but response body is empty")
    else:
        print_result("Update Quantity", False, 200, res.status_code, payload, res.text)

def test_get_products(token, expected_quantity):
    """
    Tests fetching the list of products.
    Change endpoint if needed.
    Checks if there is a product named 'Phone' with expected quantity.
    Change 'name' and 'quantity' keys if your API structure differs.
    """
    res = requests.get(f"{BASE_URL}/products", headers={"Authorization": f"Bearer {token}"})
    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, None, res.text)
        return
    try:
        products = res.json()
    except Exception:
        print_result("Get Products", False, "valid JSON list", "Invalid JSON", None, res.text)
        return
    phone_products = [p for p in products if p.get("name") == "Phone"]
    if not phone_products:
        print("Get Products: FAILED")
        print("  Could not find product named 'Phone'")
        print(f"  Response Body: {products}")
        return
    phone_quantity = phone_products[0].get("quantity")
    if phone_quantity == expected_quantity:
        print(f"Get Products: PASSED (Quantity = {phone_quantity})")
    else:
        print("Get Products: FAILED")
        print(f"  Expected Quantity: {expected_quantity}, Got: {phone_quantity}")
        print(f"  Response Body: {products}")

def run_all_tests():
    """
    Runs all tests in sequence.
    If any test fails, subsequent tests are skipped.
    """
    test_register_user()
    token = test_login()
    if not token:
        print("Login failed. Skipping further tests.")
        return
    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Skipping further tests.")
        return
    new_quantity = 15  # Change this to test different updated quantity
    test_update_quantity(token, product_id, new_quantity)
    test_get_products(token, expected_quantity=new_quantity)

if __name__ == "__main__":
    run_all_tests()