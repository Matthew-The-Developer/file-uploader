interface MedicalDocument extends File {
  documentType: MedicalDocumentType;
  attached: boolean;
}

enum MedicalDocumentType {
  DialysisTreatment = 'Dialysis Treatment',
  DonorRequest = 'Donor Request',
  BloodWork = 'Blood Work',
  BlackMarketRecipe = 'Black Market Recipe',
}

export { MedicalDocument, MedicalDocumentType };