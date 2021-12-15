DROP TRIGGER IF EXISTS tr_after_insert;


CREATE TRIGGER tr_after_insert
AFTER INSERT ON productioncost
FOR EACH ROW
UPDATE
  productioncost
SET productioncost.fixedCost = GREATEST(NEW.biayaVariable, NEW.fixedCost)
