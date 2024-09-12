import ElemEngq1 from '../assets/elementary/eng/animq1.mp4';
import ElemEngq2 from '../assets/elementary/eng/animq2.mp4';
import ElemEngq3 from '../assets/elementary/eng/animq3.mp4';
import ElemEngq4 from '../assets/elementary/eng/animq4.mp4';
import ElemEngq5 from '../assets/elementary/eng/animq5.mp4';
import ElemEngq6 from '../assets/elementary/eng/animq6.mp4';
import ElemEngq7 from '../assets/elementary/eng/animq7.mp4';
import ElemEngq8 from '../assets/elementary/eng/animq8.mp4';
import ElemEngq9 from '../assets/elementary/eng/animq9.mp4';
import ElemEngq10 from '../assets/elementary/eng/animq10.mp4';

import ElemHinq1 from '../assets/elementary/hin/animq1.mp4';
import ElemHinq2 from '../assets/elementary/hin/animq2.mp4';
import ElemHinq3 from '../assets/elementary/hin/animq3.mp4';
import ElemHinq4 from '../assets/elementary/eng/animq4.mp4';
import ElemHinq5 from '../assets/elementary/hin/animq5.mp4';
import ElemHinq6 from '../assets/elementary/hin/animq6.mp4';
import ElemHinq7 from '../assets/elementary/hin/animq7.mp4';
import ElemHinq8 from '../assets/elementary/hin/animq8.mp4';
import ElemHinq9 from '../assets/elementary/hin/animq9.mp4';
import ElemHinq10 from '../assets/elementary/hin/animq10.mp4';

import ElemKanq1 from '../assets/elementary/eng/animq1.mp4';
import ElemKanq2 from '../assets/elementary/eng/animq2.mp4';
import ElemKanq3 from '../assets/elementary/eng/animq3.mp4';
import ElemKanq4 from '../assets/elementary/eng/animq4.mp4';
import ElemKanq5 from '../assets/elementary/eng/animq5.mp4';
import ElemKanq6 from '../assets/elementary/eng/animq6.mp4';
import ElemKanq7 from '../assets/elementary/eng/animq7.mp4';
import ElemKanq8 from '../assets/elementary/eng/animq8.mp4';
import ElemKanq9 from '../assets/elementary/eng/animq9.mp4';
import ElemKanq10 from '../assets/elementary/eng/animq10.mp4';

export const ElementaryEngVideoMap: Record<number, string> = {
    1: ElemEngq1,
    2: ElemEngq2,
    3: ElemEngq3,
    4: ElemEngq4,
    5: ElemEngq5,
    6: ElemEngq6,
    7: ElemEngq7,
    8: ElemEngq8,
    9: ElemEngq9,
    10: ElemEngq10
  };

  export const ElementaryHinVideoMap: Record<number, string> = {
    1: ElemHinq1,
    2: ElemHinq2,
    3: ElemHinq3,
    4: ElemHinq4,
    5: ElemHinq5,
    6: ElemHinq6,
    7: ElemHinq7,
    8: ElemHinq8,
    9: ElemHinq9,
    10: ElemHinq10
  };

  export const ElementaryKanVideoMap: Record<number, string> = {
    1: ElemKanq1,
    2: ElemKanq2,
    3: ElemKanq3,
    4: ElemKanq4,
    5: ElemKanq5,
    6: ElemKanq6,
    7: ElemKanq7,
    8: ElemKanq8,
    9: ElemKanq9,
    10: ElemKanq10
  };

  // Export all maps in a single object
    export const videoMaps = {
    ElementaryEngVideoMap,
    ElementaryHinVideoMap,
    ElementaryKanVideoMap,
  };