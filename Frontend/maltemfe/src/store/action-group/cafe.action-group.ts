import { createActionGroup, props } from '@ngrx/store';
import { ICafe } from '../../models/cafe.model';

export const cafeActionGroup = createActionGroup({
  source: 'Cafe',
  events: {
    getCafes: props<{ location: string | null }>(),
    getCafesSuccessfully: props<{ cafes: ICafe[] }>(),
    createCafe: props<{ cafe: ICafe; callBack: () => void }>(),
    updateCafe: props<{ cafe: ICafe; callBack: () => void }>(),
    deleteCafe: props<{ id: string; callBack: () => void }>(),
    selectCafe: props<{ cafe: ICafe | undefined }>(),
  },
});
