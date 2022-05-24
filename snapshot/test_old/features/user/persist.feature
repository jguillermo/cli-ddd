Feature: Persist User
  In order to create user
  As an user
  I need to be able to persist User

  Scenario: Create User
    Given I make a request to graphql
    """
    mutation{
      userPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "User A"
      ){
        ...on Status{
          status
        }
        ...on User{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "users"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User A"
      }
    ]
    """

  Scenario: Create User show entity
    Given I make a request to graphql
    """
    mutation{
      userPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "User A"
        showEntity: true
      ){
        ...on Status{
          status
        }
        ...on User{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userPersist": {
           "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
           "name": "User A"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "users"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User A"
      }
    ]
    """

  Scenario: Update User
    Given I have the following data on collection "users"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User A"
      }
    ]
    """
    And I make a request to graphql
    """
    mutation{
      userPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "User B"
      ){
        ...on Status{
          status
        }
        ...on User{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "users"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User B"
      }
    ]
    """