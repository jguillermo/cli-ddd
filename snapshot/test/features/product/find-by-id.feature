Feature: find Product by id
  In order to find product by id
  As an user
  I need to be able to find one Product

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
        "category": "books"
      }
    ]
    """


  Scenario: find one product
    Given I make a request to graphql
    """
    query{
      product(id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"){
        id
        name
        code
        description
        createAt
        price
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "product": {
            "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
            "name": "Name",
            "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
            "description": "Description",
            "createAt": "2018-03-23T00:00:00.000Z",
            "price": 12,
            "category": "books"
         }
      }
    }
    """
    Then response should have a status 200


  Scenario: find product not exist
    Given I make a request to graphql
    """
    query{
      product(id: "daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        id
        name
        code
        description
        createAt
        price
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "product": null
      }
    }
    """
    Then response should have a status 200
