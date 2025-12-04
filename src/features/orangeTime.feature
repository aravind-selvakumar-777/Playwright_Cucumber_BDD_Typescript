@time
Feature: To contain the scenarios related to time page of Orange HRM.

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM
        And I click on "time" menu

    Scenario: User navigates to the Time module
        Then I should be in the "Time" page

    Scenario: User searches for an employee timesheet with no records
        Given I should be in the "Time" page
        When the user enters "MARTIN THOMAS" into the Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        And "No Timesheets Found" alert message should be displayed


    Scenario: Add timesheet for an employee current week for the User and submit an empty timesheet
        Given I should be in the "Time" page
        When the user enters "MARTIN THOMAS" into the Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        When the user clicks the "Create Timesheet" button
        Then a success message should be displayed "Timesheet Successfully Created"
        And an empty timesheet with message "No Records Found" should be present
        When the user clicks the "Submit" button
        Then a success message should be displayed "Timesheet Submitted"

    Scenario: Approve the submitted employee timesheet
        Given I should be in the "Time" page
        When the user enters "MARTIN THOMAS" into the Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        When the user clicks the "Approve" button
        Then status should show as "Approved"

    Scenario: Add a customer
        Given I should be in the "Time" page
        When the user clicks on "Project Info" and selects "Customers"
        And the user clicks the "Add" button
        And adds "KINGSLAYER CORP" in Name field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Saved"
        And "KINGSLAYER CORP" should appear in the first column of the list

    Scenario: Add a project with activities for the customer
        Given I should be in the "Time" page
        When the user clicks on "Project Info" and selects "Projects"
        And the user clicks the "Add" button
        And adds "MONSTER SLAYING" in Name field
        And the user enters "KINGSLAYER CORP" into the Name field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Saved"
        When the user clicks the "Add" button
        And adds "EXPANSION" in Name field of the popup box
        Then "EXPANSION" should appear in the first column of the list
        When the user clicks on "Project Info" and selects "Projects"
        Then "MONSTER SLAYING" should appear in the second column of the list