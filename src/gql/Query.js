import {gql} from '@apollo/client';

export const MEDICAL_QUERY = gql`
  {
    medical {
      Sheet1 {
        Address
        BriefDescription
        Cost
        Hours
        Latitude
        Longitude
        Name
        PhoneNumber
        Website
      }
    }
  }
`;

export const FOOD_QUERY = gql`
  {
    food {
      Sheet1 {
        Address
        BriefDescription
        Cost
        Hours
        Latitude
        Longitude
        Name
        PhoneNumber
        Website
      }
    }
  }
`;

export const HOUSING_QUERY = gql`
  {
    housing {
      Sheet1 {
        Address
        BriefDescription
        Hours
        Latitude
        Longitude
        Name
        PhoneNumber
        Qualifications
        Website
      }
    }
  }
`;

export const ADDICTION_QUERY = gql`
  {
    addictionRecovery {
      Sheet1 {
        Accessibility
        Address
        AgeRequirement
        BriefDescription
        CriminalRecordAllowed
        Gender
        Hours
        IDRequired
        LGBTQSupport
        Latitude
        Longitude
        Name
        PhoneNumber
        SubstanceAllowed
        Website
      }
    }
  }
`;
