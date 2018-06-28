'use strict';

// Development specific configuration
// ==================================
module.exports = {
  tax_slabs: [
                { lowest:      0, highest:    18200, base:     0, threshold:      0, rate: 0 },
                { lowest:  18201, highest:    37000, base:     0, threshold:  18200, rate: 0.19 },
                { lowest:  37001, highest:    87000, base:  3572, threshold:  37000, rate: 0.325 },
                { lowest:  87001, highest:   180000, base: 19822, threshold:  87000, rate: 0.37 },
                { lowest: 180001, highest: Infinity, base: 54232, threshold: 180000, rate: 0.45 },
            ]
};
