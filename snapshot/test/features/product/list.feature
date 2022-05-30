Feature: List Product
  In order to list product
  As an user
  I need to be able to list Product

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


  Scenario: List Product whitout filter
    Given I make a request to graphql
    """
    query{
      productList{
        id
        name
        code
        description
        createAt
        price
        isActive
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productList": [
          {
            "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
            "name": "Name",
            "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
            "description": "Description",
            "createAt": "2018-03-23T00:00:00.000Z",
            "price": 12,
            "isActive": true,
            "category": "books"
          }
        ]
      }
    }
    """
    Then response should have a status 200

  Scenario: List Product all filter
    Given I make a request to graphql
    """
    query{
      productList(id:"464120be-58e3-5723-abfe-6b9ac2ce98bf",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
        id
        name
        code
        description
        createAt
        price
        isActive
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productList": [
          {
            "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
            "name": "Name",
            "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
            "description": "Description",
            "createAt": "2018-03-23T00:00:00.000Z",
            "price": 12,
            "isActive": true,
            "category": "books"
          }
        ]
      }
    }
    """
    Then response should have a status 200