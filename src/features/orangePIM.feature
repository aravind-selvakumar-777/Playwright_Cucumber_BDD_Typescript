@pim
Feature: To contain the scenarios related to PIM page of Orange HRM.

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM
        And I click on "pim" menu

    Scenario: Add a new employee with mandatory fields
        Given I should be in the "PIM" page
        When the user clicks the "Add" button
        And the user enters candidate first name "Shinra" and last name "Tensei"
        And enters a random employee id
        And the user clicks the "Save" button
        Then the "Personal Details" page for the employee should be displayed along with name "Shinra Tensei"


    Scenario: System shows validation for missing mandatory fields
        Given I should be in the "PIM" page
        When the user clicks the "Add" button
        And the user clicks the "Save" button
        Then the system should show validation messages for required fields

