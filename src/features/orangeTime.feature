@time
Feature: To contain the scenarios related to time page of Orange HRM.

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM
        And I click on "time" menu

    Scenario: User navigates to the Time module
        Then I should be in the "Time" page

    Scenario: User searches for an employee timesheet with no records
        When the user enters "MARTIN THOMAS" into the Employee Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        And "No Timesheets Found" alert message should be displayed


    Scenario: Add timesheet for current week for the User and submit an empty timesheet
        When the user enters "MARTIN THOMAS" into the Employee Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        When the user clicks the "Create Timesheet" button
        Then a success message should be displayed "Timesheet Successfully Created"
        And an empty timesheet with message "No Records Found" should be present
        When the user clicks the "Submit" button
        Then a success message should be displayed "Timesheet Submitted"

    Scenario: Approve the submitted timesheet
        When the user enters "MARTIN THOMAS" into the Employee Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "MARTIN THOMAS"
        When the user clicks the "Approve" button
        Then status should show as "Approved"

