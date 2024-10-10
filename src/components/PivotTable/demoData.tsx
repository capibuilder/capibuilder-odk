import { villageOptions } from "./village";

const data = [
  {
    id: "123",
    farmer_data: {
      userName: {
        userName_first: "Sham",
        userName_middle: "Vithalrao",
        userName_last: "Madansure",
      },
      fpoVillage: "11",
      createdBy: "Dhananjay ",
      createdDate: "2023-08-22",
      createdAt: "18:38:00.000+05:30",
    },
    farmer_consent: {
      consentText: null,
      isRespondentConsented: "1",
    },
    farmer_demo: {
      userPhoto: "1692709762786.jpg",
      userGender: "1",
      userDateOfBirth: "1972-09-05",
    },
    land_holding_data: {
      note_for_surveyor: null,
      hhLandOwnership: "2",
      hhLandFarmSize: 3,
      hhLandFarmLeasedinSize: 0,
      hhLandFarmingLeasedout: 0,
      hhCultivableLand_calculate: "3",
      hhCultivableLand: null,
      landIrrigatedSize: 3,
      landIrrigationTypes: "3 4 5",
    },
    fpogroup: {
      isMemberFpo: "1",
      yearOfJoinFpo: "2023-07-31",
      isFpoServiceAvailed: "2",
      fpoServiceAvailed: "5",
      fpoServiceNeed: "1 4",
      fpoServiceIssues: "5",
      completedAt: "18:42:00.000+05:30",
    },
    meta: {
      instanceID: "uuid:6dd08052-3fc3-439c-bb4c-80655998bf99",
    },
    __id: "ec9f31becfbfc2f05194bc0e71ee03d33f2e1d0a",
    __system: {
      submissionDate: "2023-08-22T13:12:38.059Z",
      updatedAt: null,
      submitterId: "78",
      submitterName: "Umarga Shetkari Parisar FPC",
      attachmentsPresent: 1,
      attachmentsExpected: 1,
      status: null,
      reviewState: null,
      deviceId: "collect:Liir4EJl1hMEeq37",
      edits: 0,
      formVersion: "1671792116",
    },
    "e1234@odata.navigationLink":
      "Submissions('uuid%3A6dd08052-3fc3-439c-bb4c-80655998bf99')/e1234",
    note_for_surveyors: null,
    season: "1",
    season_calculate: "Kharif FY2022-23",
    crop: "103",
    crop_calculate: "Soyabeans",
    cropCultivatedLand: 3,
    seed_data: {
      cropSeedSource: "7",
      cropSeedIssues: "2 4",
      cropSeedQtyAcre: 30,
      cropSeedQtyAcreUnit: "1",
      cropSeedQtyAcreUnit_calculate: "Kg",
      cropSeedUnitAmt: 90,
      total_seed_purchase_amount_calculate: "8100",
      total_seed_purchase_amount: null,
      cropSeedAmtFund: {
        total_amount_say: null,
        cropSeedAmtFund_saving: 0,
        cropSeedAmtFund_loan: 0,
        cropSeedAmtFund_credit: 0,
        add_seed_amount: "0",
        add_seed_amount_1: "0",
      },
    },
    farm_equipment: {
      cropEquipmentUse: "9",
      isCropEquipmentHired: "1",
      cropEquipmentHiredHours_group: {
        eq_0: "Tractor",
        eq_1: null,
        eq_2: null,
        eq_3: null,
        equipment_1: 3,
        equipment_2: null,
        equipment_3: null,
        equipment_4: null,
        cropEquipmentHiredHours_calculate1: "3",
        cropEquipmentHiredHours_calculate2: null,
        cropEquipmentHiredHours_calculate3: null,
        cropEquipmentHiredHours_calculate4: null,
        cropEquipmentHiredHours1: null,
        cropEquipmentHiredHours2: null,
        cropEquipmentHiredHours3: null,
        cropEquipmentHiredHours4: null,
      },
      cropEquipmentHourlyAmt_group: {
        equ_0: "Tractor",
        equ_1: null,
        equ_2: null,
        equ_3: null,
        equipment_a: 1000,
        equipment_b: null,
        equipment_c: null,
        equipment_d: null,
        cropEquipmentHourlyAmt_calculate1: "3000",
        cropEquipmentHourlyAmt_calculate2: null,
        cropEquipmentHourlyAmt_calculate3: null,
        cropEquipmentHourlyAmt_calculate4: null,
        cropEquipmentHourlyAmt1: null,
        cropEquipmentHourlyAmt2: null,
        cropEquipmentHourlyAmt3: null,
        cropEquipmentHourlyAmt4: null,
      },
      EquipmentAmtFunding: {
        total_amount_Equipment_3: null,
        cropEquipmentAmtFunding_saving: 0,
        cropEquipmentAmtFunding_loan: 0,
        cropEquipmentAmtFunding_credit: 0,
        add_equipment_amount: "0",
        add_equipment_amount_1: "0",
      },
      productionConsumption: {
        cropProductionQtyTotal: 20,
        cropConsumptionQtyTotal: 0,
        marketable_surplus_calculate: "20",
        marketable_surplus: null,
        cropSoldQtyTotal: 2000,
        cropSoldUnitAmount: 4800,
        cropSeedPreservedQty: 0,
        cropSalePlace: "7",
      },
    },
    "__Submissions-id": "uuid:6dd08052-3fc3-439c-bb4c-80655998bf99",
    "e2@odata.navigationLink":
      "Submissions('uuid%3A6dd08052-3fc3-439c-bb4c-80655998bf99')/e1234('ec9f31becfbfc2f05194bc0e71ee03d33f2e1d0a')/e2",
    "e3@odata.navigationLink":
      "Submissions('uuid%3A6dd08052-3fc3-439c-bb4c-80655998bf99')/e1234('ec9f31becfbfc2f05194bc0e71ee03d33f2e1d0a')/e3",
    fertilizer_data: {
      cropFertilizerCategory: "2",
      cropFertilizerType: "5",
      cropFertilizerSource: "7",
      cropFertilizerIssues: "2 4",
      cropFertilizerQtyAcre: 50,
      cropFertilizerQtyAcreUnit: "1",
      cropFertilizerQtyAcreUnit_calculate: "Kg",
      cropFertilizerUnitAmt: 27,
      total_fertilizer_purchase_amount_calculate: "4050",
      total_fertilizer_purchase_amount: null,
      cropFertilizerAmtFunding: {
        total_amount_say_2: null,
        cropFertilizerAmtFunding_saving: 0,
        cropFertilizerAmtFunding_loan: 0,
        cropFertilizerAmtFunding_credit: 0,
        add_ferti_amount: "0",
        add_ferti_amount_1: "0",
      },
    },
    pesticide_data: {
      cropPesticidesCategory: "2",
      cropPesticidesType: "1",
      cropPesticidesSource: "7",
      cropPesticidesIssues: "2 4",
      cropPesticidesQtyAcre: 1,
      cropPesticidesQtyAcreUnit: "2",
      cropPesticidesQtyAcreUnit_calculate: "Litre",
      cropPesticidesUnitAmt: 1200,
      total_pesticide_purchase_amount_calculate: "3600",
      total_pesticide_purchase_amount: null,
      cropPesticideAmtFunding: {
        total_amount_say_3: null,
        cropPesticideAmtFunding_saving: 0,
        cropPesticideAmtFunding_loan: 0,
        cropPesticideAmtFunding_credit: 0,
        add_pest_amount: "0",
        add_pest_amount_1: "0",
      },
    },
    parent__id: "uuid:6dd08052-3fc3-439c-bb4c-80655998bf99",
  },
];

export type DataProps = typeof data;

const getGender = (gender: string) => {
  const options: any = {
    "1": "Male",
    "2": "Female",
    "3": "Do not Wish to Specify",
  };

  return options[gender];
};

const getVillage = (slug: string, village: string) => {
  return villageOptions[slug][village];
};

const getAge = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();

  return age;
};

const getLandType = (landType: string) => {
  const options: any = {
    "1": "Only farming land",
    "2": "Only homestead land",
    "3": "both farming and homestead lands",
  };

  return options[landType];
};

const cropSeedIssues: {
  [key: string]: string;
} = {
  "1": "High cost incurred on buying seed",
  "2": "High price",
  "3": "Lack of transport",
  "4": "Long distance",
  "5": "No problem faced",
  "6": "Not able to travel outside",
  "7": "Others (Specify)",
  "8": "Unavailable on time",
  "9": "High cost incurred on buying seed",
};

const getIssues = (issues: string) => {
  const issuesArray = issues.split(" ");
  const issuesString = issuesArray
    .map((issue: string) => cropSeedIssues[issue])
    .join(", ");
  return issuesString;
};

const formatYear = (date: string) => {
  const year = new Date(date).getFullYear();
  return year;
};

function extractNumber(inputString: string) {
  const match = inputString.match(/\d+/);

  if (match) {
    return parseInt(match[0], 10); // Convert the matched number to an integer
  } else {
    return null; // Return null if no number is found in the input string
  }
}

const fertilizerType: any = {
  "1": "Organic",
  "2": "Chemical",
  "3": "None",
};

const fertilizerSource: any = {
  "1": "APMC Market",
  "2": "Contract farming sponsor/companies",
  "3": "Cooperative",
  "4": "Farmer Producer Organisations",
  "5": "Gonvernment Agencies",
  "6": "Input Dealers",
  "7": "Local Market",
  "8": "Others (Specify)",
  "9": "Own farm",
  "10": "Private Processors",
};

const getLandIrrigationTypes = (landIrrigationTypes: string) => {
  const landIrrigationTypesData: any = {
    "1": "Canal",
    "2": "Drip",
    "3": "Ground Water",
    "4": "Piped Water",
    "5": "Sprinkler",
    "6": "Water body",
    "7": "Others (Specify)",
  };
  const landIrrigationTypesArray = landIrrigationTypes.split(" ");
  const landIrrigationTypesString = landIrrigationTypesArray
    .map(
      (landIrrigationType: string) =>
        landIrrigationTypesData[landIrrigationType]
    )
    .join(", ");
  return landIrrigationTypesString;
};

const getConfirmQuestion = (confirm: string) => {
  const option: any = {
    "1": "Yes",
    "99": "No",
  };
  return option[confirm];
};

const getFpoServiceAvailed = (fpoServiceAvailed: string) => {
  const option: any = {
    "1": "Vegetable Seeds supply",
    "2": "Paddy Seeds supply",
    "3": "Gunny Bags supply",
    "4": "Fertilizer supply",
    "5": "No services taken",
  };
  return option[fpoServiceAvailed];
};

const getFpoServiceNeed = (fpoServiceNeed: string) => {
  const fpoServiceNeedData: any = {
    "1": "Pesticide / Insecticide Supply",
    "2": "Custom Hiring Center",
    "3": "Storage Facility",
    "4": "Marketing Facility",
    "5": "Loan / Credit Facility",
    "6": "Transport Services",
    "7": "Red Gram collection center",
  };
  const fpoServiceNeedArray = fpoServiceNeed.split(" ");
  const fpoServiceNeedString = fpoServiceNeedArray
    .map((landIrrigationType: string) => fpoServiceNeedData[landIrrigationType])
    .join(", ");
  return fpoServiceNeedString;
};

const getFpoServiceIssues = (fpoServiceIssues: string) => {
  const option: any = {
    "1": "Delay in delivery of service",
    "2": "Delay in communicating service",
    "3": "Limited cash available",
    "4": "Service costlier in FPO",
    "5": "Lack of Awareness",
  };
  return option[fpoServiceIssues];
};

const getCropSeedSource = (cropSeedSource: string) => {
  return fertilizerSource[cropSeedSource];
};

const getCropFertilizerType = (cropFertilizerType: string) => {
  const options: any = {
    "1": "Vermicompost",
    "2": "Manure",
    "3": "Other organic",
    "4": "Urea",
    "5": "DAP",
    "6": "SSP",
    "7": "NPK",
    "8": "Other Chemical",
  };

  return options[cropFertilizerType];
};

const getCropPesticidesType = (cropPesticidesType: string) => {
  const options: any = {
    "1": "Pesticide",
    "2": "Insecticide",
  };

  return options[cropPesticidesType];
};

const getCropPesticidesSource = (cropPesticidesSource: string) => {
  return fertilizerSource[cropPesticidesSource];
};

const getCropSalePlace = (cropSalePlace: string) => {
  return fertilizerSource[cropSalePlace];
};
// fpoVillage: getVillage(item.farmer_data.fpoVillage),

export const simplifyArray = (array: DataProps, slug: string) => {
  return array.map(item => ({
    id: item.id,
    userName: `${item.farmer_data.userName.userName_first || ""} ${
      item.farmer_data.userName.userName_middle || ""
    } ${item.farmer_data.userName.userName_last || ""}`,
    fpoVillage: getVillage(slug, item.farmer_data.fpoVillage),
    createdBy: item.farmer_data.createdBy,
    createdDate: item.farmer_data.createdDate,
    instanceID: item.meta.instanceID,
    submissionDate: item.__system.submissionDate,
    submitterName: item.__system.submitterName,
    userPhoto: item.farmer_demo.userPhoto,
    userGender: getGender(item.farmer_demo.userGender),
    userDateOfBirth: getAge(item.farmer_demo.userDateOfBirth),
    landOwned: getLandType(item.land_holding_data.hhLandOwnership),
    farmingLand: item.land_holding_data.hhLandFarmSize,
    takenLease: item.land_holding_data.hhLandFarmLeasedinSize,
    givenLease: item.land_holding_data.hhLandFarmingLeasedout,
    availableLand: item.land_holding_data.hhCultivableLand_calculate,
    irrigated: item.land_holding_data.landIrrigatedSize,
    irrigationSources: getLandIrrigationTypes(
      item.land_holding_data.landIrrigationTypes
    ),
    isMemberFpo: getConfirmQuestion(item.fpogroup.isMemberFpo),
    yearOfJoinFpo: formatYear(item.fpogroup.yearOfJoinFpo),
    isFpoServiceAvailed: getConfirmQuestion(item.fpogroup.isFpoServiceAvailed),
    fpoServiceAvailed: getFpoServiceAvailed(item.fpogroup.fpoServiceAvailed),
    fpoServiceNeed: getFpoServiceNeed(item.fpogroup.fpoServiceNeed),
    fpoServiceIssues: getFpoServiceIssues(item.fpogroup.fpoServiceIssues),
    season: item.season_calculate,
    crop: item.crop_calculate,
    cropCultivatedLand: item.cropCultivatedLand,
    cropSeedSource: getCropSeedSource(item.seed_data.cropSeedSource),
    cropSeedIssues: getIssues(item.seed_data.cropSeedIssues),
    cropSeedQtyAcre: `${item.seed_data.cropSeedQtyAcre}`,
    totalQuantity: item.seed_data.cropSeedUnitAmt,
    totalSeedPurchaseAmount:
      item.seed_data.total_seed_purchase_amount_calculate || 0,
    cropSeedAmtFund_saving:
      item.seed_data.cropSeedAmtFund.cropSeedAmtFund_saving,
    cropSeedAmtFund_loan: item.seed_data.cropSeedAmtFund.cropSeedAmtFund_loan,
    cropSeedAmtFund_credit:
      item.seed_data.cropSeedAmtFund.cropSeedAmtFund_credit,
    cropFertilizerCategory:
      fertilizerType[item.fertilizer_data?.cropFertilizerCategory] || null,
    cropFertilizerType: item.fertilizer_data?.cropFertilizerType
      ? getCropFertilizerType(item.fertilizer_data?.cropFertilizerType)
      : null,
    cropFertilizerSource:
      fertilizerSource[item.fertilizer_data?.cropFertilizerSource] || null,
    cropFertilizerIssues: item.fertilizer_data?.cropFertilizerIssues
      ? getIssues(item.fertilizer_data?.cropFertilizerIssues)
      : null,
    cropFertilizerQtyAcre: item.fertilizer_data?.cropFertilizerQtyAcre || 0,
    cropFertilizerUnitAmt: item.fertilizer_data?.cropFertilizerUnitAmt || 0,
    totalPurchaseAmount:
      item.fertilizer_data?.total_fertilizer_purchase_amount_calculate || 0,
    fertilizerSaving:
      item.fertilizer_data?.cropFertilizerAmtFunding
        ?.cropFertilizerAmtFunding_saving || 0,
    fertilizerLoan:
      item.fertilizer_data?.cropFertilizerAmtFunding
        .cropFertilizerAmtFunding_loan || 0,
    fertilizerCredit:
      item.fertilizer_data?.cropFertilizerAmtFunding
        .cropFertilizerAmtFunding_credit || 0,
    cropPesticidesCategory:
      fertilizerType[item.pesticide_data?.cropPesticidesCategory] || null,
    cropPesticidesType: item.pesticide_data?.cropPesticidesType
      ? getCropPesticidesType(item.pesticide_data?.cropPesticidesType)
      : null,
    cropPesticidesSource: item.pesticide_data?.cropPesticidesSource
      ? getCropPesticidesSource(item.pesticide_data?.cropPesticidesSource)
      : null,
    cropPesticidesIssues: item.pesticide_data?.cropPesticidesIssues
      ? getIssues(item.pesticide_data?.cropPesticidesIssues)
      : null,
    cropPesticidesQuantity:
      item.pesticide_data?.cropPesticidesQtyAcreUnit || null,
    cropPesticidesUnitAmt: item.pesticide_data?.cropPesticidesUnitAmt || 0,
    totalPesticidesPurchaseAmount:
      item.pesticide_data?.total_pesticide_purchase_amount_calculate || 0,
    pesticidesAmtFundingSaving:
      item.pesticide_data?.cropPesticideAmtFunding
        ?.cropPesticideAmtFunding_saving || 0,
    pesticidesAmtFundingLoan:
      item.pesticide_data?.cropPesticideAmtFunding
        ?.cropPesticideAmtFunding_loan || 0,
    pesticidesAmtFundingCredit:
      item.pesticide_data?.cropPesticideAmtFunding
        ?.cropPesticideAmtFunding_credit || 0,
    isCropEquipmentHired: getConfirmQuestion(
      item.farm_equipment.isCropEquipmentHired
    ),
    equipment: item.farm_equipment.cropEquipmentHiredHours_group.eq_0,
    equipmentSaving:
      item.farm_equipment.EquipmentAmtFunding.cropEquipmentAmtFunding_saving,
    equipmentLoan:
      item.farm_equipment.EquipmentAmtFunding.cropEquipmentAmtFunding_loan,
    equipmentCredit:
      item.farm_equipment.EquipmentAmtFunding.cropEquipmentAmtFunding_credit,
    hiredHours:
      item.farm_equipment.cropEquipmentHiredHours_group
        .cropEquipmentHiredHours1,
    equipment_a: item.farm_equipment.cropEquipmentHourlyAmt_group.equipment_a,
    cropEquipmentHourlyAmt_calculate1:
      item.farm_equipment.cropEquipmentHourlyAmt_group
        .cropEquipmentHourlyAmt_calculate1,
    cropProductionQtyTotal:
      item.farm_equipment.productionConsumption.cropProductionQtyTotal,
    cropConsumptionQtyTotal:
      item.farm_equipment.productionConsumption.cropConsumptionQtyTotal,
    marketable_surplus_calculate:
      item.farm_equipment.productionConsumption.marketable_surplus_calculate,
    cropSoldQtyTotal:
      item.farm_equipment.productionConsumption.cropSoldQtyTotal,
    cropSoldUnitAmount:
      item.farm_equipment.productionConsumption.cropSoldUnitAmount,
    revenue_calculate:
      item.farm_equipment.productionConsumption.cropSoldQtyTotal *
      item.farm_equipment.productionConsumption.cropSoldUnitAmount,
    cropSeedPreservedQty:
      item.farm_equipment.productionConsumption.cropSeedPreservedQty,
    cropSalePlace:
      getCropSalePlace(
        item.farm_equipment.productionConsumption.cropSalePlace
      ) || null,
  }));
};

export const simplifiedArray = simplifyArray(
  data,
  "WOTR-v102-Jalpriya-Marathi"
);

export type SimplifiedArrayProps = typeof simplifiedArray;

function combineObjects(json2: any, json3: any, json4: any) {
  const combinedData: any = {};

  // Combine json2 objects
  for (const obj of json2) {
    const id = obj.__id;
    if (!combinedData[id]) {
      combinedData[id] = { ...obj };
    }
  }

  // Combine json3 objects
  for (const obj of json3) {
    const parentId = obj["__Submissions-e1234-id"];
    const parent = combinedData[parentId];
    if (parent) {
      if (!parent.fertilizer_data) {
        parent.fertilizer_data = [];
      }
      parent.fertilizer_data.push(obj.fertilizer_data);
    }
  }

  // Combine json4 objects
  for (const obj of json4) {
    const parentId = obj["__Submissions-e1234-id"];
    const parent = combinedData[parentId];
    if (parent) {
      if (!parent.pesticide_data) {
        parent.pesticide_data = [];
      }
      parent.pesticide_data.push(obj.pesticide_data);
    }
  }

  return Object.values(combinedData);
}

export function processData(inputArray: any) {
  const resultArray: any = [];
  const combinedData: any = [];
  inputArray.forEach((item: any) => {
    if (item.fertilizer_data?.length && item.fertilizer_data.length > 1) {
      item.fertilizer_data.forEach((fertilizer: any) => {
        const newItem = { ...item };
        delete newItem.fertilizer_data;
        newItem.fertilizer_data = fertilizer;
        resultArray.push(newItem);
      });
    } else {
      const newItem = { ...item };
      resultArray.push({
        ...newItem,
        fertilizer_data: item.fertilizer_data?.[0] || null,
      });
    }
  });

  resultArray.forEach((item: any) => {
    if (item.pesticide_data?.length && item.pesticide_data.length > 1) {
      item.pesticide_data.forEach((pesticide: any) => {
        const newItem = { ...item };
        delete newItem.pesticide_data;
        newItem.pesticide_data = pesticide;
        combinedData.push(newItem);
      });
    } else {
      const newItem = { ...item };
      combinedData.push({
        ...newItem,
        pesticide_data: item.pesticide_data?.[0] || null,
      });
    }
  });

  return combinedData;
}

export function combineObjectsIfMatch(
  json1: any[],
  json2: any[],
  json3: any[],
  json4: any[]
): any[] {
  const idMapping: Record<string, any[]> = {};

  const mergedJson: any = combineObjects(json2, json3, json4);

  for (const obj2 of mergedJson) {
    const id = obj2["__Submissions-id"];
    if (!idMapping[id]) {
      idMapping[id] = [];
    }
    idMapping[id].push(obj2);
  }

  const combinedObjects = [];

  for (const obj1 of json1) {
    const id = obj1.__id;
    if (idMapping[id]) {
      for (const matchingObj2 of idMapping[id]) {
        const combinedObj = { ...obj1, ...matchingObj2 };
        combinedObj.parent__id = id; // Rename json1's __id property
        combinedObjects.push(combinedObj);
      }
    }
  }

  return processData(combinedObjects);
}

export const selectOptions = [
  {
    label: "Aam Jan Krushi  FPC (Block- Kherwara, Rajasthan)",
    value: "WOTR-v102-Aam Jan Krushi FPC-Hindi::5",
  },
  {
    label:
      "Aapli Agro Farmer Producer Company Limited (Block- Osmnabad, Maharashtra)",
    value: "WOTR-v102-Aapli Agro-Marathi::2",
  },
  {
    label: "Bamanwas FPC (Block- Bamanwas, Rajasthan)",
    value: "WOTR-v102 Bamanwas-Hindi::5",
  },
  {
    label: "chawand mata FPC (Block- Sarada, Rajasthan)",
    value: "WOTR-v102-chawand mata FPC-Hindi::5",
  },
  {
    label: "Idana Mata  FPC (Block- Kurabad, Rajasthan)",
    value: "WOTR-v102-Idana Mata FPC-Hindi::5",
  },
  {
    label: "Jaisamand Kisan FPC (Block- Jaisamand, Rajasthan)",
    value: "WOTR-v102-Jaisamand Kisan  FPC-Hindi::5",
  },
  {
    label: "Jaishri Rishabdeo  FPC (Block- Rishabhadev, Rajasthan)",
    value: "WOTR-v102-Jaishri Rishabdeo FPC-Hindi::5",
  },
  {
    label: "Jay Bhomiya FPC (Block- Gangapur city, Rajasthan)",
    value: "WOTR-v102-Jay Bhomiya FPC-Hindi::5",
  },
  {
    label: "Jalpriya FPC Bhoom (Block- Bhoom, Maharashtra)",
    value: "WOTR-v102-Jalpriya-Marathi::2",
  },
  {
    label: "Karkela Bhairo FPC (Block- Semari, Rajasthan)",
    value: "WOTR-v102-Karkela Bhairo FPC-Hindi::5",
  },
  {
    label: "Lasadia kisan FPC (Block- Lasadiya, Rajasthan)",
    value: "WOTR-v102-Lasadia kisanr FPC-Hindi::5",
  },
  {
    label:
      "Luhakhambeswara Farmer Producer Company Limited (Block- R. Udayagiri, Odisha)",
    value: "WOTR-v102-Luhakhambeswara-Odia::2",
  },
  {
    label:
      "Natural PanchKrushi Farmer Producer Company Limited (Block- Washi, Maharashtra)",
    value: "WOTR-v102-Natural PanchKrushi-Marathi::2",
  },
  {
    label:
      "Rajerao Rambha Farmer Producer Company Limited (Block- Karmala, Maharashtra)",
    value: "WOTR-v102-Rajerao Rambha-Marathi::2",
  },
  {
    label: "Salumber Kisan  FPC (Block- Salumbar, Rajasthan)",
    value: "WOTR-v102-Salumber Kisan  FPC-Hindi::5",
  },
  {
    label:
      "Santadayanand Farmer Producer Company Limited (Block- Bhokardan, Maharashtra)",
    value: "WOTR-v102-Santadayanand-Marathi::2",
  },
  {
    label:
      "Sata Bhauni Farmer Producer Company Limited (Block- Gosani, Odisha)",
    value: "WOTR-v102-Sata_Bhauni-Odia::2",
  },
  {
    label:
      "Shree Shambho Mahadev Farmer Producer Company Limited (Block- Lohara, Maharashtra)",
    value: "WOTR-v102-Shree Shambho Mahadev -Marathi::2",
  },
  {
    label:
      "Shri Bhagwant Mahila Farmer Producer Company Limited (Block- Barshi, Maharashtra)",
    value: "WOTR-v102-Shri Bhagwant Mahila-Marathi::2",
  },
  {
    label: "Shri Dev Malarna FPC (Block- Malarna Dungar, Rajasthan)",
    value: "WOTR-v102 Shri Dev Malarna-Hindi::5",
  },
  {
    label: "Shri Sameswar FPC (Block- Jhallara, Rajasthan)",
    value: "WOTR-v102-Shri Sameswar FPC-Hindi::5",
  },
  {
    label:
      "Shri Yogirana Krushi Farmer Producer Company Limited (Block- Paranda, Maharashtra)",
    value: "WOTR-v102-Shri Yogirana Krushi-Marathi::2",
  },
  {
    label: "Tuljabhavani FPC  Tuljapur (Block- Tuljapur, Maharashtra)",
    value: "WOTR-v102-Tuljabhavani-Marathi::2",
  },
  {
    label:
      "Ujjaleswar Farmer Producer Company Limited (Block- Digapahandi, Odisha)",
    value: "WOTR-v102-Ujjaleswar-Odia::2",
  },
  {
    label: "Uthala Mata Kisan Utpadak FPC (Block- Vallabhnagar, Rajasthan)",
    value: "WOTR-v102-Uthala Mata Kisan Utpadak PC-Hindi::5",
  },
  {
    label:
      "Umarga Shetkari Parisar Farmer Producer Company Limited (Block- Umarga, Maharashtra)",
    value: "WOTR-v102-Umarga Shetkari Parisar-Marathi::2",
  },
];
