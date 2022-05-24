Feature: List User
  In order to list user
  As an user
  I need to be able to list User

  Background:
  Given I have the following data on collection "users"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User A"
      }
    ]
    """


  Scenario: List User whitout filter
    Given I make a request to graphql
    """
    query{
      userList{
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "User A"
          }
        ]
      }
    }
    """
    Then response should have a status 200

  Scenario: List User all filter
    Given I make a request to graphql
    """
    query{
      userList(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "userList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "User A"
          }
        ]
      }
    }
    """
    Then response should have a status 200