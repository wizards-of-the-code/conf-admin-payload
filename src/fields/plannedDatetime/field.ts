import { Field } from 'payload/types';
import CurrencySelectComponent from './component';
import getPlannedDatetime from '../../hooks/getPlannedDatetime';

const PlannedDatetimeField: Field = {
  name: 'planned_datetime',
  type: 'text',
  label: 'Запланированное время отправки (UTC)',
  admin: {
    position: 'sidebar',
    components: {
      Field: CurrencySelectComponent,
    }
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // Ensures data is not stored in DB
        delete siblingData['planned_datetime'];
      }
    ],
    afterRead: [getPlannedDatetime],
  },
}

export default PlannedDatetimeField;