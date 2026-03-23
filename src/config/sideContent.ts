export type CardSide = "bride" | "groom";

export const CARD_SIDE: CardSide =
  (import.meta.env.VITE_CARD_SIDE as CardSide) || "bride";

interface FamilyGroup {
  label: string;
  names: string[];
}

interface BlessingsContent {
  lines: { name: string }[];
}

interface ParentContent {
  lines: { prefix: string; name: string }[];
}

export interface SideContent {
  nameFirst: string;
  nameSecond: string;
  blessings: BlessingsContent;
  parents: ParentContent;
  warmRegards: FamilyGroup[];
}

const brideContent: SideContent = {
  nameFirst: "Srishti",
  nameSecond: "Parth",
  blessings: {
    lines: [
      { name: "Smt. Sushila & Sh. Ram Kishore Khandelwal" },
      { name: "Mrs. Ruchika & Mr. Rajesh Khandelwal" },
    ],
  },
  parents: {
    lines: [
      { prefix: "D/o", name: "Mrs. Ruchika & Mr. Rajesh Khandelwal" },
      { prefix: "GD/o", name: "Smt. Sushila & Sh. Ram Kishore Khandelwal" },
    ],
  },
  warmRegards: [
    {
      label: "Warm Regards",
      names: [
        "Amit – Charu",
        "Anil – Manisha",
        "Arpit – Aishwarya",
      "Akshat, Vertika, Divita, Arnav",
    ],
    },
    {
      label: "Special Invitation",
      names: [
        "Sapna – Ravi Ji Gupta",
        "Ritika – Ashutosh Ji",
        "Payal – Shashank Ji Rawat",
      ],
    },
    {
      label: "Paternal Side",
      names: [
        "Shri Jawahar Lal – Smt. Kamini",
        "Smt. Sunit – Lt. Shri Hemant Ji",
        "Nikunj – Richa",
      ],
    },
    {
      label: "Maternal Side",
      names: ["Smt. Shakuntla Ji", "Santosh – Trisha"],
    },
  ],
};

const groomContent: SideContent = {
  nameFirst: "Parth",
  nameSecond: "Srishti",
  blessings: {
    lines: [
      { name: "Mrs. Nirmal Rani & Mr. Shyam Sunder Trehan" },
      { name: "Mrs. Rama & Mr. Dinesh Trehan" },
    ],
  },
  parents: {
    lines: [
      { prefix: "D/o", name: "Mrs. Ruchika & Mr. Rajesh Khandelwal" },
      { prefix: "GD/o", name: "Smt. Sushila & Sh. Ram Kishore Khandelwal" },
    ],
  },
  warmRegards: [
    {
      label: "Warm Regards",
      names: [
        "Nikita – Prateek",
        "Vanshika – Rahul",
      ],
    },
    {
      label: "The Cutest Guest of Honour",
      names: ["Ira Sharma"],
    },
  ],
};

export function getSideContent(): SideContent {
  return CARD_SIDE === "groom" ? groomContent : brideContent;
}
