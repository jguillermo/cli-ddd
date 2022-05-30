Feature: Delete Product
  In order to delete product
  As an user
  I need to be able to delete Product

  Background:
  Given I have the following data on collection "products"
  """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
        "description": "Description",
        "createAt": "Date(2018-03-23)",
        "price": 12,
        "isActive": true,
        "category": "books"
      }
    ]
    """


  Scenario: delete one product
    Given I make a request to graphql
    """
    mutation{
      productDelete(id:"464120be-58e3-5723-abfe-6b9ac2ce98bf"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
    And I validate empty data on collection "products"


  Scenario: delete product not exist
    Given I make a request to graphql
    """
    mutation{
      productDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
