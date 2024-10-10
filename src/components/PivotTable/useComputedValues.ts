import { useMemo } from "react";
import { SimplifiedArrayProps } from "./demoData";

export const useComputedValues = (rowData: SimplifiedArrayProps) => {
  const isMemberFpoCount = useMemo(() => {
    const arr = [] as any[];
    rowData.forEach(item => {
      if (!arr.includes(item.id)) {
        if (item.isMemberFpo === "Yes") arr.push(item.id);
      }
    });
    return arr.length;
  }, [rowData]);

  const isFpoServiceAvailedCount = useMemo(() => {
    const arr = [] as any[];
    rowData.forEach(item => {
      if (!arr.includes(item.id)) {
        if (item.isFpoServiceAvailed === "Yes") arr.push(item.id);
      }
    });

    return arr.length;
  }, [rowData]);

  // const calculate2021Crop = useMemo(() => {
  //    const arr = [] as any[]

  //    rowData.forEach((item) => {
  //       // check in array if id is present
  //       if (!arr.find((i) => i.id === item.id)) {
  //          // check if year is 2021
  //          arr.push({
  //             id: item.id,
  //             yearOfJoinFpo: item.yearOfJoinFpo,
  //          })
  //       }
  //    })

  //    return arr.filter((i) => i.yearOfJoinFpo === 2021).length
  // }, [rowData])

  const revenue_calculate = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.revenue_calculate, 0)
  );

  const rowCount = useMemo(() => {
    const arr = [] as string[];
    rowData.forEach(item => {
      if (!arr.includes(item.id)) {
        arr.push(item.id);
      }
    });

    return arr.length;
  }, [rowData]);

  const availableLand = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.availableLand, 0)
  );

  const irrigated = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.irrigated, 0)
  );

  const totalSeedPurchaseAmount = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.totalSeedPurchaseAmount, 0)
  );

  const cropSeedAmtFund_saving = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.cropSeedAmtFund_saving, 0)
  );

  const cropSeedAmtFund_loan = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.cropSeedAmtFund_loan, 0)
  );

  const cropSeedAmtFund_credit = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.cropSeedAmtFund_credit, 0)
  );

  const totalPurchaseAmount = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.totalPurchaseAmount, 0)
  );

  const fertilizerSaving = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.fertilizerSaving, 0)
  );

  const fertilizerLoan = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.fertilizerLoan, 0)
  );

  const fertilizerCredit = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.fertilizerCredit, 0)
  );

  const totalPesticidesPurchaseAmount = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.totalPesticidesPurchaseAmount, 0)
  );

  const pesticidesAmtFundingSaving = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.pesticidesAmtFundingSaving, 0)
  );

  const pesticidesAmtFundingLoan = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.pesticidesAmtFundingLoan, 0)
  );

  const pesticidesAmtFundingCredit = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.pesticidesAmtFundingCredit, 0)
  );

  const cropEquipmentHourlyAmt_calculate1 = Math.round(
    rowData.reduce(
      (acc, curr) => acc + +curr.cropEquipmentHourlyAmt_calculate1,
      0
    )
  );

  const equipmentSaving = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.equipmentSaving, 0)
  );

  const equipmentLoan = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.equipmentLoan, 0)
  );

  const equipmentCredit = Math.round(
    rowData.reduce((acc, curr) => acc + +curr.equipmentCredit, 0)
  );

  return {
    isMemberFpoCount,
    isFpoServiceAvailedCount,
    revenue_calculate,
    rowCount,
    availableLand,
    irrigated,
    totalSeedPurchaseAmount,
    cropSeedAmtFund_saving,
    cropSeedAmtFund_loan,
    cropSeedAmtFund_credit,
    totalPurchaseAmount,
    fertilizerSaving,
    fertilizerLoan,
    fertilizerCredit,
    totalPesticidesPurchaseAmount,
    pesticidesAmtFundingSaving,
    pesticidesAmtFundingLoan,
    pesticidesAmtFundingCredit,
    cropEquipmentHourlyAmt_calculate1,
    equipmentSaving,
    equipmentLoan,
    equipmentCredit,
  };
};
