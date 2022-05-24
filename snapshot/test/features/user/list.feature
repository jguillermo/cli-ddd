Feature: List User
  In order to list user
  As an user
  I need to be able to list User

  Background:
  Given I have the following data on collection "users"
  """
    [
      {
        "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
        "name": "Name"
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
            "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
            "name": "Name"
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
      userList(id:"9e556479-7003-5916-9cd6-33f4227cec9b",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
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
            "id": "9e556479-7003-5916-9cd6-33f4227cec9b",
            "name": "Name"
          }
        ]
      }
    }
    """
    Then response should have a status 200