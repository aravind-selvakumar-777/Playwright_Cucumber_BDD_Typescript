@admin
Feature: Contains scenarios of Admin module
  Background: Goto website and login
    Given the user is on the OrangeHRM login page
    Given the user is logged into OrangeHRM
    And I click on "admin" menu

Scenario: Add a new job title
  And the user clicks on "Job" and selects "Job Titles"
  When the user clicks the "Add" button
  And adds "Automation Test Engineer" in Name field
  And the user clicks the "Save" button
  Then a success message should be displayed "Successfully Saved"
  And the job title "Automation Test Engineer" should appear in the Job Titles list
