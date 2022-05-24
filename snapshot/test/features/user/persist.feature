Feature: Persist User
  In order to create user
  As an user
  I need to be able to persist User

  Scenario: Create User
    Given I make a request to graphql
    """
    mutation{
      userPersist(
        id: "9e556479-7003-5916-9cd6-33f4227cec9b"
        name: "Name"
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
        "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
        "name": "Name"
      }
    ]
    """

  Scenario: Create User show entity
    Given I make a request to graphql
    """
    mutation{
      userPersist(
        id: "9e556479-7003-5916-9cd6-33f4227cec9b"
        name: "Name"
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
           "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
           "name": "Name"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "users"
    """
    [
      {
        "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
        "name": "Name"
      }
    ]
    """

  Scenario: Update User
    Given I have the following data on collection "users"
    """
    [
      {
        "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
        "name": "Name"
      }
    ]
    """
    And I make a request to graphql
    """
    mutation{
      userPersist(
        id: "9e556479-7003-5916-9cd6-33f4227cec9b"
        name: "NameUpdate"
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
        "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
        "name": "NameUpdate"
      }
    ]
    """