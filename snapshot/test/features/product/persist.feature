Feature: Persist Product
  In order to create product
  As an user
  I need to be able to persist Product

  Scenario: Create Product
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "Name"
        code: "4c25724a-e571-597a-9b09-436f356b4cd7"
        description: "Description"
        createAt: "2018-03-23"
        price: 12
        category: "books"
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
          code
          description
          createAt
          price
          category
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
        "description": "Description",
        "createAt": "2018-03-23T00:00:00.000Z",
        "price": 12,
        "category": "books"
      }
    ]
    """

  Scenario: Create Product show entity
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "Name"
        code: "4c25724a-e571-597a-9b09-436f356b4cd7"
        description: "Description"
        createAt: "2018-03-23"
        price: 12
        category: "books"
        showEntity: true
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
          code
          description
          createAt
          price
          category
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
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
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "4c25724a-e571-597a-9b09-436f356b4cd7",
        "description": "Description",
        "createAt": "2018-03-23T00:00:00.000Z",
        "price": 12,
        "category": "books"
      }
    ]
    """

  Scenario: Update Product
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
    And I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "NameUpdate"
        code: "decd739b-9f46-5fb7-abb8-086460a78493"
        description: "DescriptionUpdate"
        createAt: "2018-03-23"
        price: 12
        category: "books"
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
          code
          description
          createAt
          price
          category
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "NameUpdate",
        "code": "decd739b-9f46-5fb7-abb8-086460a78493",
        "description": "DescriptionUpdate",
        "createAt": "2018-03-23T00:00:00.000Z",
        "price": 12,
        "category": "books"
      }
    ]
    """