export const adminJobTitleCreate = {
  description: '',
  specification: null,
  note: '',
};

export const pimEmployeeCreate = {
  middleName: '',
  empPicture: null,
  employeeId: `${Math.floor(Math.random() * 100000)}`,
};

export const createAndMapVacancy = {
  numOfPositions: 8,
  description: '',
  status: true,
  isPublished: true,
};

export const createCandidate = {
  middleName: null,
  contactNumber: null,
  keywords: null,
  comment: null,
  dateOfApplication: new Date().toISOString().slice(0, 10),
  consentToKeepData: false,
};

export const createCustomerData = {
  description: '',
};
