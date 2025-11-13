@orange
Feature: Login functionality on OrangeHRM

  Background:
    Given the user is on the OrangeHRM login page

  Scenario: Successful login with valid credentials
    When the user enters a valid username and password
    And clicks on the login button
    Then the user should be redirected to the dashboard page

  Scenario: Unsuccessful login with invalid credentials
    When the user enters an invalid username "Admins" or password "Admin"
    And clicks on the login button
    Then an error message "Invalid credentials" should be displayed

  Scenario: Login attempt with blank fields
    When the user leaves the username and password fields blank
    And clicks on the login button
    Then an error message "Required" should be displayed under username and password
