@recruitment
Feature: To handle the functionalities present in Recruitment page.
  Background: Goto website and login
    Given the user is on the OrangeHRM login page
    Given the user is logged into OrangeHRM

  Scenario: User navigates to the Recruitment page
    When I click on "recruitment" menu
    Then I should be in the "Recruitment" page

  @cleanup
  Scenario: Add a new job vacancy
    Given I create an job title with name "<JobTitle>"
    And I create an employee with name "<Employee>"
    And I click on "recruitment" menu
    Then I should be in the "Recruitment" page
    When the user clicks on "Vacancies"
    When the user clicks the "Add" button
    And adds "MYSTERY ATTENDENT" in vacancy Name field
    And selects "<JobTitle>" as the Job Title field
    And the enters "<Employee>" into the Hiring Manager field
    And the user clicks the "Save" button
    Then the title should be "Edit Vacancy"
    When I click on "recruitment" menu
    And the user clicks on "Vacancies"
    Then "<JobTitle>" should appear in the second column of the list
    Examples:
      | Employee        | JobTitle        |
      | GEHRMAN SPARROW | MIRACLE INVOKER |
  @cleanup
  Scenario: Successfully add a new candidate
    Given I create an job title with name "<JobTitle>"
    And I create an employee with name "<Employee>"
    And I create a vacancy with name "<Vacancyname>" for "<JobTitle>" with manager "<Employee>"
    And I click on "recruitment" menu
    Then I should be in the "Recruitment" page
    When the user clicks on the Add button
    And the user enters candidate first name "EMPEROR" and last name "RUDEUS"
    And the user enters email "rudeus.qa@gmail.com"
    And the user selects a job vacancy "<Vacancyname>"
    And the user uploads a resume file
    And the user clicks the "Save" button
    Then a success message should be displayed "Successfully Saved"
    And the new candidate "EMPEROR RUDEUS" should appear in the candidate list
    Examples:
      | Vacancyname           | JobTitle     | Employee      |
      | DEMONOLOGY SPECAILIST | DEMON HUNTER | KLEIN MORETTI |

  @cleanup
  Scenario: Shortlist a candidate from the candidate list
    Given I create an job title with name "<JobTitle>"
    And I create an employee with name "<Employee>"
    And I create a vacancy with name "<Vacancyname>" for "<JobTitle>" with manager "<Employee>"
    And I create a candidate with name "<Candidate>" with email "<EmailID>" assigned to vacancy "<Vacancyname>"
    And I click on "recruitment" menu
    Then I should be in the "Recruitment" page
    When the user finds and selects the candidate "<Candidate>"
    And the user clicks the "Shortlist" button
    And the user clicks the "Save" button
    Then the candidate status should update to "Shortlisted"
    Examples:
      | Candidate          | EmailID                    | Employee         | Vacancyname    | JobTitle     |
      | ALEXANDER REYNOLDS | alex.reynolds.qa@gmail.com | SPHIXX CORNELIUS | JUNIOR CATCHER | BIRD CATCHER |

  @cleanup
  Scenario: Edit an existing candidate
    Given I create an job title with name "<JobTitle>"
    And I create an employee with name "<Employee>"
    And I create a vacancy with name "<Vacancyname>" for "<JobTitle>" with manager "<Employee>"
    And I create a candidate with name "<Candidate>" with email "<EmailID>" assigned to vacancy "<Vacancyname>"
    And I click on "recruitment" menu
    Then I should be in the "Recruitment" page
    When the user finds and selects the candidate "<Candidate>"
    And the user clicks the Edit toggle button
    And the user updates the contact number to "9876543210"
    And the user clicks the "Save" button
    Then the updated contact number "9876543210" should be displayed in the candidate profile
    Examples:
      | Candidate      | EmailID                     | Employee      | Vacancyname   | JobTitle     |
      | RADAGON OXWELL | radagon.oxwell.qa@gmail.com | JULIUS CAESAR | PIRATE HUNTER | NAVY OFFICER |