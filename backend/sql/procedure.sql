DROP PROCEDURE IF EXISTS sp_calculate_totalcost;

CREATE PROCEDURE sp_calculate_totalcost(IN rowId INT)
BEGIN
    UPDATE productioncost SET productioncost.totalCost = GREATEST(
        biayaVariable,
        fixedCost
    ) WHERE id = rowId
END
