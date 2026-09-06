import React, { useState, useMemo, useRef, useEffect } from "react";

function Icon({ size = 24, color = "currentColor", children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const ShoppingBag = (props) => <Icon {...props}><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></Icon>;
const X = (props) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
const Plus = (props) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
const Minus = (props) => <Icon {...props}><path d="M5 12h14" /></Icon>;
const Check = (props) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
const ChevronDown = (props) => <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const Lock = (props) => <Icon {...props}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>;
const Mail = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
const Target = (props) => <Icon {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></Icon>;
const ClipboardCheck = (props) => <Icon {...props}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="m9 13 2 2 4-4" /></Icon>;
const Bolt = (props) => <Icon {...props}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></Icon>;

const TOKENS = {
  ink: "#182338",
  inkSoft: "#5B6472",
  paper: "#F6F4EF",
  paperAlt: "#EEEAE0",
  card: "#FFFFFF",
  brass: "#A9824C",
  brassDark: "#856539",
  mark: "#A23B3B",
  logoYellow: "#F5D658",
  line: "#DAD5C8",
  shadowSm: "0 1px 2px rgba(24,35,56,0.05), 0 1px 1px rgba(24,35,56,0.04)",
  shadowMd: "0 10px 28px rgba(24,35,56,0.10)",
  shadowLg: "0 18px 44px rgba(24,35,56,0.16)",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,500&family=Inter:wght@400;500;600;700&display=swap');
html, body {
  overflow-x: hidden;
  max-width: 100%;
}
:focus-visible {
  outline: 2px solid ${TOKENS.brass};
  outline-offset: 2px;
  border-radius: 2px;
}
@media (max-width: 700px) {
  .hero-illustration {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAAC+CAYAAAC1dI36AAAtN0lEQVR4nO3dd5wcdf3H8ddnZrbe7l5JuZQLJBBCCCQISImIIfCTHqV3QRCxgQUQlCJIURBFQVDpEMCGFAVpghSlSJUkRCHU9HJJ7vbu9rbNfH9/zAUC3u7tzu1dCp/nwwUfD/ZmZ2Z33vOdb5WuuUeilFKqOta63gGllNoQaXgqpVQAGp5KKRWAhqdSSgWg4amUUgFoeCqlVAAankopFYCGp1JKBaDhqZRSAWh4KqVUABqeSikVgLOud2AghRzBsWWogcy63pf+EIgXXdNaKJqK/2ZjOvZC0bQW3cqPXanBsNGGZ8gRHn2hy9z5aAfRsKzr3emX7pzhiL2TTN++TtwKQiTkCI8822nueqJzgz/2TNZwwowUu0yOV3TsSg2WjTY8RWBV2uXmm3OwxYYdIMwz7DU1jlR4GCKwsr240Rz7IdNdNvCjUBuhjTY8Af+CaxJSsQ370kunDFJpcvYQERiyERy7Yyq+aSg1mDbuBiO96JRSA2TjDk+llBogGp5KKRWAhqdSSgWg4amUUgFoeCqlVAAankopFYCGp1JKBaDhqZRSAWh4KqVUABqeSikVgIanUkoFoOGplFIBbNSzKim1vvFniBq4GWuM0TlPB4uGp1KDxLJgzrt5kysMzDR7ngdTxkXEsWu/bfW/NDyVGiSWJZxxRStPPlIYsM9Y+sKYY1IJ6w4tgA48DU+lBokAQ+stmGiTCtd2256BztcMIqyq7ZZVKdpgpNRgMj2vgdq2GjQbd3jqj0kpNUA2/sd215D3pCYNnBbgbEhLe7iQr9ENxAbsDenYlRpgG3V4egZoh2yyBgkiQESIxzaMAPU8oM2QTdRgYwJEhXh0wzh2pQbDRhuehYLhgE8nZPkriS0Fuvq7Pcti4Zz5eTNtxjJSU9bv2o5C0fD56UlZ/kqyNsduy8JZ87rN9MNWkNpm/T52pQbLRhueBog4QiTE67XYnoiQjAgbQkWqMbU9dtsSEmEBrxZbU2rjsNGGJ/TEXI2yTjBsSH3nannsA9lArNSGSp/BlFIqAA1PpZQKQMNTKaUC0PBUSqkANDyVUioADU+llApAw1MppQLQ8FRKqQA0PJVSKgANT6WUCkDDUymlAtDwVEqpADQ8lVIqAA1PpZQKQMNTKaUC2Kjn81SqEpYFYcca8IKE5fBJZyCvOIFwWB6Mhq2hxgzsEsQF13iu+/Ge5VXDU32sicCC5UXz89tWkagb2Py0LHj5XZdIqPbbFgG2EH5wXauJOTKgk1dncoYTZ6TYerOouN7HN0A1PNXHmgDdOcOvr8/A5vaAT5kfiQuRAchoAZIR+OVD2YFfLuVtw2F7JPzA/hjT8FRK/H+k6jbsNBAgFR/4Y0hjPvbBCdpgpJRSgWh4KqVUABqeSikVgIanUkoFoOGplFIBaHgqpVQAGp5KKRWAhqdSSgWg4amUUgFoeCqlVAAankopFYCGp1JKBaDhqZRSAWh4KqVUABqeSikVgIanUkoFoOGplFIBaHgqpVQAugyHUj0Kg7CWmSM9q34MkKIZ8GWYVA8NT/WxZwyAofvdAU4eBxglJJ2BCdC8gexyAxkGOEEN3sd41cw1NDzVx5pnYEJLSLrmjhvYIiEQsoWjz11s/jSrSCpc2217BrJvGZY81fKF+oR1uxngbBNjKOq67Up9vK0peQ7G8+6Ahlo3WJiVmIE/lo93bPq0wUipwabJs1HQ8FRqMGlwbjQ0PJVSKgANT6WUCkDDUymlAtDwVEqpADQ8lVIqAA1PpZQKQMNTKaUC0PBUSqkANDyVUioADU+llApAw1MppQLQ8FRKqQA0PJVSKgANT6WUCkDDUymlAtDwVEqpADQ8lVIqAA1PpZQKQMNTKaUC0PBUajAJA77EsRocuvSwUoMokzOwxCOdqHGCGsAYjKGpthtWpWh4KjVIPAMHTYszfXsXS2pf/MwVDI4jD9Z8w6pXGp5KDRLXNXxxRoMM2GO7gaJrMLq88aDQ8FRqEBWKmmwbC20wUkqpADQ8lVIqAA1PpZQKQMNTKaUC0PBUSqkANDyVUioADU+llApAw1MppQLQ8FRKqQA0PJVSKgANT6WUCkDDUymlAtDwVEqpADQ8lVIqAJ2SrkIGKLoALulZg/3pHrm8N9gf+iHFIvjHPthTqnkUCjqNm1r/SNfcI9f1PmwwPANdObOniKwazM81xjRFQ/JY2PZDfF1wPcjk182xx0LyWGgdHrtSvdHwVEqpALTOUymlAtDwVEqpADQ8lVIqAA1PpZQKQMNTKaUC0PBUSqkANDyVUioADU+llApAw1MppQLQ8FRKqQA0PJVSKgANT6WUCkDDUymlAtDwVEqpADQ8lVIqAA1PpZQKQMNTKaUC0PBUSqkABnQBOBEQhJ7/+WvQGDD+P9bpmjTS84+P7p8x/l4ZXTCnKmXP5zr+rtXGTWTNv/3/M1jXck3D07IE2wIsobvbZXm7Z9o6XPI5D88zWLYQCluk6iyGpWxJxC0sS/Bcg+cZvAG+wtbsn1hCpttjWZtrVne4FHIexhickEU8bjEsZX+7qd6+0rbAdcHzTL+/AMsCxylf0DfGVLVSpAChcPltCgzYypuWJdg2IEJXxmVZm2vaOjyKeQ+MwQ5bJOosRtQ7W9QnrTeFnvNp+n8+exMKyfsXUClu0eAO9A+tQiIQDll93lgKBW/AAiDkCGKVP2elSM9d0et5GWMw3sDfKEXAEsF2wPOgvcPdeXnae64z41LMG8Bg2RbRmEVjnfX20Hp780jEQoyp6e+vJgvAObZQNPDW/Jz5578z/PLBbv7zeIHyp1FgvMUZ+0fZdbsYn9giunjkMGe0BRSKtT39IUcoevDWgpx5+tVurn84w0t/62P/RtmcdkiUvT4VZ/uJsYlNSfv1fMAfsQgsXlE05123klS897BzPcO40SHOOm6Ilcv1fXULkCkY55xrWgvGfHD3/RAD7VnDzPOapZbnNBwSskXDvPdy5ulXuvnZAxne/UeR0udTYGubC2ZE2WPnOrbZPCqpuJDPm5pdaCFHuP3BdvOPf2cJh3oPg3SXx5nHN7HlmJCsD08W3XlTd+rlyztTdb3/Jozxb7qXfGOoxEJS8wCNhIUb/txmnn8tR8ipPkAjIWhIWLQMc2ge7jChJcyIYSFJxiwKRb9AVGvhkNDR7fHyf7vN489nuOTPOZhX7OOvhK33CHHCtCg7To6x1djIto0pa5ZbpF830n6HZyRiyTOzMt6Pb13Ng/cWoFlgiJB0eh7lysh6kO8ysMBAEY46JsLx+yfZ/ZN1Ytz+l0QtATtk8fcXOs0v/9jOX+8pwDCBoUIyVH7/ch7kMgbeNjDO4vIv1nH85xomNias1/NVriNuCbyzuGAm7bkYxpcoKWbgiD0i/O7CEWO6s97CvrYpQEfObN98yMKXMIDdy5sM8BYU5m0i1e5zb2xLMAIPP9tpLv9dmqcfLsAIgaa+v+8uF9wOA/MNzidsrjomwZH71EsiKjVZlz0SEi69pdWc+4suGFliT970ePq+EWw/PireOk7PcFj4w9/S5tivrYbxZc7cm4YH7xjKHp+sk6Jb232ORa2Ws69ZseDSGzMwNMAGPMAFuoFWAx4kd7A5Y+8Yh++VZMKYSF0u72VqcaptSygY+OPDbeZLN3TAHA/GCqGEEOuj5cYAHUWg3cAiAy3CuUfHOWrvFBPHRuqyOS8TZJ8Ch6clUPDgrKtWmF9fm4EtLZIR6TMwS/EMdGYNzDMkdrRZcsvooE8TgP8IN39pwRx2wXJeeawIW1qkIsG2lfGg2GpgqeHem5vYd9ekuG7lRX9L4J0lBTNpjyUkp1i9nqN01nDs1Cgzz2+uODw782bs8GMXveMYiPcSnp6BztmmJuEZCglz38mZT3xzOfzXg4kWqXCwbaVdYJmBNNx3fRN7fSohbrF/j1KRkPCTmSvN2bd2kWooUfKc5fLMfSPYbj0ITw9h/HELzbKMIVWm8ixdgEnNFq9cN1qKNX4ii0WtlvN+vWLBJXdmSKX6cbH1MECHC/TcJL/2lRjnnzx0/8aE9UB/gt9xhHcX582WX14GSzzY1CLVW2GhQlkP8h0G3vO44pJ6vnlEo+Ty1e9foNZ2EcgU4OCzlphf35slOcUm1Y/gBD9gUjGBMcLZ+8SIR6140G1FwhZ//WenGb/bYl5Z6JKaEjw4AeIWpIYLkckWB56wkrOuXmFEpPdH5Y2Q4wgz72szn9hrCVj45zNgcAKkbEiNEkIThBnHt3LmlctN0fN/Ax8HjiP8a3aXWfaiWzY4AVIhmPtEgVfnZY01ECeohpsUer7bBiExxeLXD2YZMX3hX+e+kzNBqgXArxKc9WbWbLn7EnAgtVn/ghMgakGq3t+fPXeMB37yCRSeti2cd80K8+iLRVLN/QvN/7HA49C9UuTywYrS0ajVNPP+1eagE1qJTbZIRWq3dxGB1BSbX9yS4euXLTMfh/QMRywuur7VnHRaO4nJdp8XezViln8+r/xDlqPPXWJyxRJ1txsZD7j2ng6YUOHBbmFx5e/biYSlZUB3rIYs/BClRdhun6X8592cse3qvlwRWNXhfmHH/ZbB1hapUO32L52H6fuH2WKTSOD676rD07GFJ1/qMr+6NkNqePmTkTeQzhjSqwzp1p5/dxn/sa0X6azh0KOibDYqbAU5oFBI+MPD7StP/HYbySk2JdoNelXNx6XGWtx8czdX3L7SOAHvqBuCkCNcetMKc/HlXaSmWBWXDA1Vns+Rwv0vFdnrtMWmpkWh9ZAl8MZ7OXPn77OkopUdayIq3HFbltfn5xdYG1jP7JQD9jYW2+61hM6s51RzcwyHLTnzqtaZbCZ9ljbTRUh3GNIre7KmzZDOGnKlOpq84XHaESkcK3jvgKrLEaGQtOz7s9UwqfTReAY63/QgLnzt0Cibj7KJhC2yOcPCFUVmvlhg9b96Wsi2FBJh8S/MNwyn/DhFsVh9dNqW8NrbOXP011YTn2z3eQl2ueC2Gljm4V+w7/dEhSSwiUXS7v1STi/0OPYLUb5yaONwt8aV+OuLkCP89ZlOc94lXSSn9NHFCujIA2960FvD53ghEZOy4ZtqEJ5/qciPbm415588TPID1L1qXYtGrcm/urMdNq88BS0BWoR7Hkvz3eOGkB/krlbp+R609faZAqMEq1FIlAm3OgvSYyyuvGNV4fyTh0klXecsC95amPdum5mlbnLpc5V2gdc8xu7qcPS+YZobbcQSOro85r5X4I4nC+QWuDBEYIR/TXe5wHiLqVPiiX7VxVbzZhF4e0lhgftikeSU3s+WZ6DzdY/fXdXEfrslJBZe64oxgMCPPVjd7l4w563s+T+/M81Dd+dhmLDJzjafmBATL8ABGQu2O2U5TLIoVxgsGsgs8GCYxW/OSLHTtjFGNTmHhkNyl+uaLVa0e2/MmZfli9e10/Gii7ONxZreRQbomOXxja/G+Nl3hkst+n+uj0RgRbv7/YO+uJLY5N4buNZY8+Pd/YAQp32/kUmbR2iss2MiZDu6vSffWVL4zG0PdHDjDd2wpZStRkm0WFz8ky72mlpndt46VvMGknVNBBatKB537XUZUiWun1IiDcLZV3Zx4oEN+6fi1l8H63eXXmq4/ceNjN80jLdW5hkDuazHa2/mOPX2TtKLDKnRpb/baINw0RUZvnxw4Z5h9fZBfeW/bQtPv5qBJqHU037aBVyY9ehIthgTFvsjGWsMXFs0LFheNM++muHEmzroeNWFBPzotASNSdtkSxZN+1ZVeNqWsGBRjp5xJL3qXG244rwUR+5TP7U74/ZaGStAY9K6YNr2dRfstUti8junF5669f62hpbhDomYUG3LVzjkd/vgbY/U1qXvUlkP8nM8bvxFA0fuUy8RR8gX1j55Mq8uZskWLUkOnJ7i4ec6zIzvrCI9VEiG/eC8/MIk3z56yEZbMgKIhK34Zbes+BFjpWzVRzpnwBWevHs4u30iPqZQMAvX7jcXjdjTmhsdpm0Xn3zGMblZ37yilb+9UiTV1PtGLYCtLL56xSqe+80oHNm4RiaFw5b84eHVZzC6RL9OoCNtem35jliQw/DA0533H7tvvdSie1dFlhsmbhJmyvioFN0PP4mJwLTt49GTDmnK3njvanPKme2kSjylhAWyjuG52d0Hfn5aEq+vG6OBufNyUF/mPa95zP37SDYfHRbXNRR6qQ60gE2bHRm/Xz3H7tfA83Mz5vzrVnN4P9pV1t525W+2YEWbC/VlrqiFhu0mRsjnvedKnR5/6BS4riHT7c0e2WQ3nnPiUDlyr/pAXQYyOcPZt6Zhy9KHUzR+cD76p2Ecf0CD4Blyeb/T+0df+YKhUPDYd5eEvH7vSChAx6wiN17VwLeOatqog9MSeHdJoeuqa7qJJ0t/z+kiEBHm3zbyoanbxKQ76y0s9nTfWvvlev53PG5UWO65bJQctEuIdEfp7zgVgrn/KPLC3O6BaV1eR0RgdYc79PQ7urB66UplgI6Vhh+fkCC9svfzE97E4sTvtVMs0WYwULz3v0+Dt9bL9QzZnMl6RY+vHd444aQvRUl3lbl+Rwovz81WVKvtebBwpQclGon8TxFGD3fE9UoPtliTNWuu6R0nxuQvPx0lo4Y4/R4oEajBiHJf3hbCbx/pwBP/vZVUEHsGCgUTqKuKbQuz52XN/H+V7/aRme3xh+ua2H27OqvS4Yq5gmHTYSF545YR3HXTMI7fv8EatDv+OuI4wkPPdMBwKVn94RpgrsdrVzbT3OTsW8noJdc1WGK48QfNQlL88C1lovC9G9qJRGWnQAexHnJs4ckXu5bzptdr/WBH1nDM7mG+fmSTsMjQ2ymNWkDG8MRLXYG7/gTV1zec7zbzvnpYA7xV5p1R4cm5BSq6hARCdukPFoCQ4fGXMyYctqTSG23R9e8Etaj2qCo8XQ+GN9rQWabkEBOuvz/HYWcuMc/NyZhM3jjhsEUkLAxEScKy4MmXMjCmfClpzFSHQ/8vNaSSoY9rc13DmGGOzPh0Qqr926oIWDaII9s6jlDJy7Ll3Vq2vgqQK8LvHuv2K9hL6FpluPT8JFttGhlTTYW7MZCIWjx2ThPMLX0DS4WFFx7OsXSlu+nGUPYUoODC6TemYUKJL+wNw7H7JUnFrP0vOS9BZnWJ87qVxWW3t7O+tVMaDKOb7G+Ve49jwbNL/Xku+vpebQvGDLehUPo9ya0sDjxuJZfe0uq9vThvXAPRiBUPOYPTB7uqOk/PNWwyOvJ7MEf2tP30KjVMuH9ugfsPWQGTrMJJU8NMnRzlExOitIwM7TC8wS54Hm/l8iYDwe8Ca36Uv/tnFso8YjLX49o7migUzKogn+N5DMg43bXFwsITs/N84ezF9xf6GKq75kiLxmB5EOtnp+G1N9yeLv7knw8XyrewLzIctU/qqWyu75FQH1UoGnbcJi4TPmWbN9rKja4R3nwv98cdt47Jht6jwbKEl17vNu89W+y1TrDLA8YKO0+OS7bL49A9U5xzUQc0/e8XmwzBkw8WmHNq1kzePLp+nRshW6tNGQPbbBGBFRkoMfpJgOQUi3Nv7uLcizrZcbpj9twhwi6TokzYLMImzSGpi8lOhbx53i9x1rYOvarwNMCY4c6PDjg0euT9r+b9EUElpCICU4QuF254KscN9+Vg+WpAXmIHm59+Ps6u28fZatOIxKOC65oPteZVRCDb7UXnPFEsebH7mSfssGV0v4EOwP4ICazIGm5/IV/5H4nfkFWrm6wgvLe8+F3///cuXYDd9gvRPMSZ5gZsDa+LWU3HTI9x/h1dJS8MRgpz3s4xdUoMd5Dr+GotHJaW71/bBhNLTArTZrjspAT1Caspm/VWbToqJIcdFTV3vpT/n76gArCZcPOf0/z89OiA73ulBGHBiuK15d5T9ODToyx/joQ+Qr/oGqZtX/dDulafnzd+g1PvnwupJsE0CS8s9Xjhrgz8qgsyBhCz++fCfGW/OrbbKsqY4WEJ2f62B/2xHSCb9WZffkoTzDMV1V3U2f6jfGqEkJpi+yGXNZxxbSdTD1hKw/4LzRW3rzTzlxdNNFL9kMz2LrcNSl/snS5M+oxNvM5+cH1vug2Jf9Op+FXD4AS/UWNlW7GPGT4M++0QKdl9pBJu0az65MQILCzzhcTgnSUF+pxjbj1nWcLcd3ILnnogT6LUkNaFHgfvmSSX81aBf1GeuH8S3uj9/CQTwq+u7WbRikLbYJ2dvj4mEpPJ1/yhvfwkJ1nDbluFynYlXMMYaG6yL7j6J/VkZ/ddqhL8xsZUUkiNt0hNsambbPHEG0WOOnM1E6ctZvdTF5l7nkj7VYnVjKApoerw9AxsPjosf7l1CN2z3ZKjhUp5f/zrED9MQyn43g1dbPmZxVx6S2uXoboxzp05EylbGC8atm2xCfVjJMHHhQhkujxIlHlTFoY12f26c3seDK23e+9Qv4YNHZ0GgVjwT1r3HEf4/UNp2FR6vdjSOcPeB0YYOzL8futv0TXsuE0swQSLzl6uLwFoEe54MF0fjVgDPmTTkp45NC350Mu2hEhYwBJ+dtvKWbfeniUVL3PxLjZsPyla8XWYyxtOOrBBTjgxSnq2V/Usa7ZAKuyPCExNsXlhkccRp6xm6IELC4+90GUifcyF25dAf10oGPb/dLLuqbubIW1IL/R6bR2sRMzygzQ+2eKcazrZ9PhFpj1j9qu0IaSSi9ipVZ3gRk6kp5qj3Ln3gvWKWJuBnsbD8l+eWY+rWSphCSxpLdxz8eVdxEpVT7xuOOOoetauuzQGGpO2ufSoOrx07+cg0Sicd3EHq9Lu6gEtfI4UXn0rxzOvdZtnX8u8/3pmTsY8+mKn+fkdq0zdjvPNd3/ZWbaPdc4DIsLUKfGfVlNP6xUNv/les1xxcYrO2R7pruBzwKZCkJpoIXFhn6NX8JOZK43Vj0eowNM8ZHNeZpdtYrLs3tHT73w0/fdTzkr7/2ELwYn4c+xVs1uOQKrFYmWrx5HnLv3r/VeMrOiJxB/BVOadtvBeqx/uFlr6LMczEIsKlOs6HBHSnV6/WjMtgXSXS9nvzYNYXxM1rudsR3jo6c4DGdL7YIMOF9jGYvuJUflofXwu72UO2jPJ936Yhsb/vftbAjRZ/PWfHZ3H7BOsf3QlUsOEL13cBst7+Y8WMEqIbir0VYjLrTRceGodI5qc71azsoEBikXDqUc0yWd3jpuf/7aNm27qhiYLmoWoU7o+tJSkDUyxOfvCDobWW+ZLBzYGmtOzX7/OQtGQjFuPn3xwo7TN3kQe+u1QvjQtSrHT0DHLI73AkO40pIuVh1YqKTzxYIG7HkubUAX1EvV11h5QevtxB576R5Fc1lvv55zocvEnNqj01WZq2mXFeFDf4JTtHkId/Ou/efozTMBxJD777Ty0lPlCctAy3Mb4U+1ukLJ5w8mnp4mO6v04Tbvhl8claGpwpocci3D4g1coZDFhXOTwGYdESJdqQxwhXHhHB53Zvrv+9EdqhOVPQ/jR1zYWqaa+gzNdAJbAN/sxwCSf9xjfEpFrz26W955r+dvN59czbTOb7Lse6Vke6RWGdHeZiUB6kZhicfLpbcxfVpgdpDDQ7wnGTE8H95AN03eok72nJiZf/i1v9sKleTP7rRyvzM3ypxfzvPuMC1FgbAVzQU6yOGtmBwdN75n1pMzwgXjcepwpNhnXUNfL47kjQKdh3sK82XZ8VEwtmtkGQMaDbZstjvtCnGIFLXECdLtw0V1dYOhXA84HDJsOc3JAydlPExHhd7fnuOp0r6UuIuWafEoqFE3mgWe6IVF+pNo2m0XwAkwSsz4IOcLDT3caMIRLXZkJ4Z+v5Jg9b+nfe+sJ4thCIW9KFnFSDrz1rMvzczJm2na1n2m+FtJ5YIHHf58YSdSRfi174XmGfB6G1dt7fWG/eo47oCG+ZFXx++8tzJ/7yrwcL76W5ZbHC+TmezBCiAwVImWC3QIYbXHn39KbnXbMkKrX+qrpAnBF11DsNrMjNmwxJiITx0Y4fM8U5+UNK1cXs/9+Ixv56R87eOahPNHJdsnidsqBpc+7LF9ZNKOGlW6bM0DEFk7fPcLP7usu3ddzC+FXf2rn1gtiO2Uy5vlqj2vNb38gL+Ni3jB5bIhvHTv0xGK3e3Nfz8WC39hw3t1dpujS642jWgZoanCibGebjrzxH28+whIgBo+/2LXg4N2TkqtyxJVtCa/Pz5lH7iuQKDNbDhg23zRCcQOt9/SAi2a2w1aljzEVhj/8u0DZBoOwlJ9DdUvhJ3ek2X2HuvIj/waZa6BrqYGY8MYDo9h0RKhm4W6MP/oPTKYpYZ03bFLsvJ0mxzjp8/DT0zxn4bJC4emXM3zj4g5ycUNqRJnfWVJ44qUspx5R/b4Ffmz3V7Ar/d89z18JMl8whARGDHGi+++alH/+evQWT9zdTHaZoa9qmkWrimWmIPEZYPqOMXin/Kinmbd08/zc7n9VO6xNBDI5U/fe8sKAz93pumDy3t/yBUM+7/X5Kha8saaGtRHGQF1EuGi/GKZEQwVAZLzF4V9ezaoub2w1jUcCGIEfXr8Ktig9RV2XC2zusNnI0JgNsdzp2MJL/+k2rzxeJNnHBL6pUE9XvlKvPm6KqYjw6H055ryVW2/mAigav+P/T05NkH6oRTZp7l9wWlL6N26MX2jL5w2ua4iHpbjlmIicfEijdL20ifz01CTpxaU/27bhgXdcOnJemTmhSuxXle8H/EDpzHg7L15ZWd/MNYPzi66hu9t789Pbxq0bzk6RXV7+hOYKps9kcF3DJyfF92eMkClX6t7aZuczVrB0VfGeSgPUsgTXwDevWN651bTFvPZ2zkRq0D9sfeZ6sO+nE7CgdKtmRIBx8N2fL3+nSPl5OtcQIBSx+NWdq8zd95QfYOG+7XHH6SmKRVP1CKb1gRG4+S9p2LzGqyyUMt7i6j+2DdhM8+m0Ib3kI68yYznyHgyLCid8vqEhJP1bodKyYP7Sgsl7VLTCpzH+0sL5ggHX8O1jhtTRYpXMBluALnBddqj2ywoUno4jPPxc13Obf3oR19+zuitb8BeTsqzKxpQaD5NK2JArf1LrIn13zjQGhtbbD1x8fB3FXids9aVswDVscuKSA+e8nTPxmDXZ6mUdojUl6ljUalm2uvjCjDOWmN8+mke2ttl+n6U8PSvT7/5h6zPXNUweH5Xd9g35ExyXkEoKtz6c54QLlph01mwfCfvncu3TKfjn03EEY/urW55+bgepMo+yWQ9whf+bmthhIOrwpKdzhgR8VbL9+UsL5oYbsyTqBudGWxcTbropy7tLCy/UuvCZ7jBceFScW86p58azU9x4dopbz6tn/4kO6e7ev5+4DStaPc65ekVbKNy/PXIci92+v4JdvrbI/OPfGRMKWYRD//tbK8W2ZecJDVbJmpG8gcYGCDnyl2q74lRd5ylANmf4wq/bYSubr16W5qtntJmzTktwyJ4JNm8JSyJqYfXknvE++EMRP63fWVEwX7+mnXLzGgKMGe7cW0mvrnze4yuHNg4/9+KO5cVGu+QIhlRESLuw/T5LOOXrdbNOmJFi3OiQREIWdk/DVK5oWNJaNHf9Lc25l3T4q24O9TeYn2wx7ZDl3HnDEHPg7qmNdmo64xquPm0I2352CZSZtDc1XPjTSwX+tN2Cl37903r23qUuN6TJiYZtv8SVd6Gr0z3p2Tnd1x/8fX9agb5mpc/P8fjdbxppTFgv134GK6Ez45HudPc1hiZTTQd8Y+KRsHVVNFJ+/fRo2Bp6y33tsEnvneIBCga6+1pq/KMEEk7vpR1bgNHCHx9Jjzj92Cbytey29I7hc9MSbDshNqHomnngFy5237nuvk33XXxAZhTvTxa+tlS9cN31Wfb5VIc349OJQKu32pbwyuvdZvlzBZZvZbPn4SugeaW5/qwUu38yTvMQR2Jh8RPCfNAmseZG5xn4y1Mdf3/jiULJeUYpGPaeEiYZFaqdfLvq8LRs4blZXYY5nr9DIwUz0uayuzNcdkUXjBBz8v4RJm0eZswIhyFJm5Aj5AqGxauKzHkjx6VXZGCr0gs6deQMe38uxJAG56BKOkoboL7OWnHPzUM46ISVZWfpTvX08br6oW6u/lUGxlhmn+1tmustOrNw13+KMNuFMUJyyoeX8wgLhKfYHHbSSq7/hWuOO6BBigPUv25dcj3D1uOicskPkuacn3WSKrNkRCouuJOFr12WhhXtkdG72Ga3cQ6OA3MXubz8dxfCBmeC1etFtrZ0xvDZGSE+v3tqQCb7TU6x+OwprbDcPFD9Xxtuv7bpysOmp0rOcC9Aa9od8qPLO0uutFAw0O3BruPsqubltCx49g2XRF3vAeo0Ct+7qZMTP9cwJRGTWbWsK84XIVcw89bu3D6qyZlx908bzcEnroJSEyBvY3Hw11bx3hPRR4Y32HtVO3dFKCTxa+5shy16smKKRbcHX/5RO7S2Me5Ttjl8pwjjx4YZPdQmGfev186sx7tLCzz2fDd3/j5fOjgBWg37TI0RZHayIGsYNR37izaY9MGnCfizX08R8h5c91QOHsxB2kDnWn/cBNT7o4nKVl+8bjjlnBQhy18bvhKFgmG/XZNy1uk5c9n1XaTGlj8bqcQH+/vQ6y64RbAEx4F4H6Wj5BSbL3+7jc4uY75+WONGt1wE+KX5bx7ZJE/PzpsHXi68v1Rrb2zxF3EzI4VFHYbfv5z372iOkJgsWBU876YLwJuGW37ffLqY4KNIyhEgOUJgRPVPkh1ve4T66A8WDlv8+eHV/2Vo6aVLumd7PHDHUD47NWEXi6biOHFCkrhy5sqOM67tfP9JaG1xy18y47EXOl89ZHpKKpljtT/yBcPnpqWso4/t8n77dJ5ULz1dohbkR8E517R+9vpzR1DNEBXLgjcX5btuveXDaxjFLIiNEhglvNNmuOwv3dDZ7a+xtKaayQGGCqTKP+m4Blhl2G+35MTCQK/bbtvCS//Jrlz+XKFk94mw1dN6OFT8NZbX7lTbYpFKlp5kFyDdafj8IWE+u0ui6h+AWzRc8OWhcuKhUdJvV/a7DFs9419jQiri19f0pSNrYBubA/dI/ifIeksbgp7s444fjpBPbm6TLjW/5FqEnnkLIkIq6nexqaTGK50HVhv++8RIhiTtKwayd5IEfPVVwSZAR7fHd2Z2QHPvb17zU/nM9nWSz3qeVzRU+irmTOcB05Kw2JQc4+1MsDjqwvbAQ6Wrlc975orvDDuANko2yKQSwu235bj7sbSJVDEUyLYt7nwkDS2l1zBKOf72UyOE1MS1cmaSRWq4/xss94ldsz1+f20TjUnr9SCnrLrCqsAv/7Aaxg1Mg0m6y0AOfnN28+F9TVnVG79V33D1mc3ynS/FSc/y/AaIGvHwRwBREN67ceT9o5qcSRtoN8SKeAaiYeGRn4+UQ3cNk57lVTYLeBXbT7f6JYa3/jSScSPD69f8lFWwHeFfszOm8xWvZPeirpWGyy5IEgtL1bOHeZ5h7KiQHHpEmM4SDa1xC1jk8dysjHFqM2qirJ4x+H998JohFOd4JcuViSkWx3x9FQuWF9+qpDuVCCxbVbjp3Is7cXpZsqS/DJCe5fH9M+rw2y6C/eaqm0neNczYrQ7SkH7H8x+1aqDb8w9mr0kOi/88+qsNddadQUPJ9PSLuuyU4XLPzUPI/9dfx7m/d+N0ztA5y+PbB0dpu69FmuudGevjiI5a8zxDNCzcduEIufEXDXTP9ki3lS79VCrdbeic7XHmETHa/tIio4fWrhP1uuAauPT29pJzdhqAxYZD/i8ZeOExC/jy51Mlp6oDYKLFj2a2IYPU57NYNOy5U0K+c2qcjhK9XSyALS1OuHj5ZmsW+u5LJCRXfvc7cYpzPNKrqxt2WU46Z+iY5fKzi5Kcf/LQQCv1rlFdEdLAQdOTsvzRlokzf9zAlkMt0rNc0stM+TVpSkgX/NAsLDHcclUD91w+ShoT1rX9nbTYHzLqccBuCVn0zOgfXnRiHZnZHum3var20zN+V430LJfpmzs8fe9wLv9Ws4Tt/vVdK7Png/hXVWzf+LPbfHFGQ928f4zirENj/gw3Cz1/cosKFUzP2P1ZHoftEObFB0dwyTeGD+D5HByWJcx9O2eeeCBfcuhxR7fhuOMjtAwPBV54rFA0TP1EnYCUDJNEGB69r8Cct7LGrqT0WYPTXix4/ODkocJ8U/JJLxURnnikwG8faDNOH32le5ZrefXHpwy3/vP4SH5wTJzcYv93k+4wVNvJxTP+U216lstnNnN4+s/NfPvoIXVusX9161U3GOXzhkRUXj9yr3o5eI8Uby7Mm2f/3c0592ZY9cyaGluBRoF4zycI/jNvHmg17w9H2+QzIa46q5Fdt42PaUhYC/MF068JJ3rb16akdcFZxw+54KQDG77w6PNdM78+s4P0cz1F5rhAg/gr9An+8Lbunn3sWWT+u9+Oc+TeSSaOjYpj+Q0pQfgtjR4ds0q/Z+nW1X2VnmEMczxcIF3ujTXKpWzOy7QMc+TCrw7jG4cX73nk2c4DT7q5i/SsnvOZsPylYtd850X8GZpWrTmfFpddUMeMzyQZN9of8V3L7l6d3Qbme6TnD0Spy1BqKGokLC3fvHoVIKRnlToew7EXJfvdab4uIvEfn5/g+z9Mkys97oar72zjV2c297m9jm4D7xrSZdaf7KsqxRiIR4Qn7xrGtEOWkS9TJvvyaavZYVLMbLVpWMrdLw2Qy3lm3MiwnPuloXzrSI9X38yah5/JcNlt3WRXrLlrCwwXfzaGNdUlRfzreOUH1/FXvhLji79Isu34mNgW9Ge99jWka+6Rwf8YQISQA05Idkp3es8vbC2a1tYCS1qLLGtz6ch4uB6EHWFIymL0UIdRI0Js0hyWpnprp3zOPO96tZkWv+y+ij9sLhSWnVasdtvfW1L476JleRYuL9LWZfA8QzwqNDfYjGkOMWpkmLHDHXEcacnlzELTzxZgERCrfAW2MdWtleT3Z+t7YMJA1COK+CM+HEcmL1nlbr9waf6WhUsLLFhRJJ3xMB4kYhYjm2w2GRFi1Ijwa5sMd3YCf7q1gfi+Kx2kEVS570dEKuruUovvwrGFvh5/Pc+v/+9LJefMq/D6dGyp6BopFA22VHdPX/Nbj4SlRYTGJSvdqUtXFq5d0VpkcWuR1g6X7qwBgVhEGNFoM2Z4iObhIcaNCEkkLJOzWTO7v9fxh/apP+HZ6wbF79xqWT0rKKydFwbjef56z1WvV1Rj/kzYYNkf/ukYzxjP8x8jN8Rx1euC0HM+bRDrf8+n6/mLB+rpVLUigFgfZM3/LNfS87sbyOu4prMqwQdj2P0ZXsz7/1jfeGsCfAOd8mx9YvB/pK4HAzv3lFK+NaMXP3gSGPzf3cY7SFsppQaQhqdSSgWg4amUUgFoeCqlVAAankopFYCGp1JKBaDhqZRSAWh4KqVUABqeSikVgIanUkoFoOGplFIB/D+0J25gLGV95AAAAABJRU5ErkJggg==";

const PRODUCTS = [
  {
    id: "single",
    code: "SET·01",
    subject: "Single set",
    title: "Single Practice Set",
    desc: "One full set — Paper 1 (English & Verbal Reasoning) and Paper 2 (Non-Verbal Reasoning & Maths), written in a Quest-style format. Choose which of the 10 sets you'd like below.",
    price: 7,
    pickSets: 10,
  },
  {
    id: "core",
    code: "CORE·04",
    subject: "Core package",
    title: "Core Package — 4 Sets",
    desc: "Sets 1–4 — eight papers in total, at a lower price per paper than buying them one at a time.",
    price: 25,
    originalPrice: 28,
  },
];

const BUNDLE = {
  id: "premium",
  code: "PREM·FULL",
  subject: "Premium",
  title: "Premium — Full Set",
  desc: "All 10 sets we publish, covering a comprehensive range of question types in the Quest-style format — material like this is hard to find anywhere else this early into the exam change.",
  price: 65,
  originalPrice: 70,
};

const FAQS = [
  {
    q: "What format do the papers come in?",
    a: "Every paper is a printable PDF in exam-style format, with a separate answer booklet and full mark scheme.",
  },
  {
    q: "How quickly will I get access?",
    a: "Instantly. After checkout you'll get a download link by email, and the papers stay available in your account.",
  },
];

function money(n) {
  return `£${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: TOKENS.brassDark,
      }}
    >
      {children}
    </div>
  );
}

// A small, bespoke illustration of the actual product — two overlapping
// specimen paper covers in the site's own type system — rather than a
// generic stock photo or abstract SaaS graphic.
function PaperStack() {
  const sheets = [
    { code: "PAPER · 01", title: "English & Verbal Reasoning", rotate: -5, x: 0, y: 14, z: 1 },
    { code: "PAPER · 02", title: "Non-Verbal Reasoning & Maths", rotate: 4, x: 44, y: 0, z: 2 },
  ];
  return (
    <div style={{ position: "relative", width: 264, height: 292 }}>
      {sheets.map((s) => (
        <div
          key={s.code}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 210,
            height: 264,
            background: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: 6,
            boxShadow: TOKENS.shadowLg,
            transform: `rotate(${s.rotate}deg)`,
            padding: "20px 18px",
            boxSizing: "border-box",
            zIndex: s.z,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: TOKENS.brassDark,
              marginBottom: 10,
            }}
          >
            {s.code}
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 600,
              fontSize: 13.5,
              lineHeight: 1.3,
              color: TOKENS.ink,
              borderBottom: `2px solid ${TOKENS.brass}`,
              paddingBottom: 12,
              marginBottom: 16,
            }}
          >
            {s.title}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 5,
                borderRadius: 2,
                background: TOKENS.line,
                marginBottom: 10,
                width: i % 3 === 2 ? "58%" : "86%",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function HeroButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: TOKENS.ink,
        color: "#fff",
        border: "none",
        borderRadius: 4,
        padding: "14px 22px",
        fontSize: 14.5,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: hovered ? "0 10px 24px rgba(24,35,56,0.28)" : TOKENS.shadowSm,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      Browse sets <ArrowRight size={16} />
    </button>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

// Fades + lifts content into place the first time it scrolls into view.
// Skips the animation entirely for anyone with prefers-reduced-motion set.
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function PaperCard({ product, onAdd, featured }) {
  const [setNumber, setSetNumber] = useState(1);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPickable = Boolean(product.pickSets);

  const handleAdd = () => {
    if (!isPickable) {
      onAdd(product);
    } else {
      onAdd({
        ...product,
        id: `${product.id}-${setNumber}`,
        code: `SET·${String(setNumber).padStart(2, "0")}`,
        title: `${product.title} — Set ${setNumber}`,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: TOKENS.card,
        border: featured ? `2px solid ${TOKENS.brass}` : `1px solid ${TOKENS.line}`,
        borderRadius: 6,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        boxShadow: hovered ? TOKENS.shadowMd : TOKENS.shadowSm,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: 24,
            background: TOKENS.logoYellow,
            color: TOKENS.ink,
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: "5px 11px",
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(245,214,88,0.5)",
          }}
        >
          BEST VALUE
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Eyebrow>{product.code}</Eyebrow>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: TOKENS.inkSoft,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: 3,
            padding: "3px 8px",
          }}
        >
          Answers & explanations
        </div>
      </div>
      <h3
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontWeight: 600,
          fontSize: 22,
          color: TOKENS.ink,
          margin: 0,
        }}
      >
        {product.title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: TOKENS.inkSoft, margin: 0 }}>
        {product.desc}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingTop: 14,
          borderTop: `1px dashed ${TOKENS.line}`,
        }}
      >
        <div>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: 13,
                color: TOKENS.inkSoft,
                textDecoration: "line-through",
                marginRight: 8,
              }}
            >
              {money(product.originalPrice)}
            </span>
          )}
          <span
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 19,
              fontWeight: 600,
              color: TOKENS.ink,
            }}
          >
            {money(product.price)}
          </span>
        </div>
        {isPickable && (
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 12.5, color: TOKENS.inkSoft, display: "block", marginBottom: 6 }}>
              Which set?
            </span>
            <select
              value={setNumber}
              onChange={(e) => setSetNumber(Number(e.target.value))}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 3,
                padding: "10px 12px",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                background: "#fff",
                color: TOKENS.ink,
              }}
            >
              {Array.from({ length: product.pickSets }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  Set {n}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          onClick={handleAdd}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            width: "100%",
            boxSizing: "border-box",
            background: added ? "#4C7A4C" : TOKENS.ink,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "12px 16px",
            fontSize: 13.5,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: hovered && !added ? "0 6px 16px rgba(24,35,56,0.22)" : "none",
            transform: hovered && !added ? "translateY(-1px)" : "translateY(0)",
            transition: "background 0.15s ease, box-shadow 0.2s ease, transform 0.2s ease",
          }}
        >
          {added ? (
            <>
              <Check size={15} /> Added
            </>
          ) : (
            <>
              <Plus size={15} /> Add to basket
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onQty, onRemove, subtotal, onCheckout }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(24,35,56,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
          zIndex: 40,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(400px, 100%)",
          background: TOKENS.paper,
          borderLeft: `1px solid ${TOKENS.line}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 41,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 22px",
            borderBottom: `1px solid ${TOKENS.line}`,
          }}
        >
          <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600, margin: 0, color: TOKENS.ink }}>
            Your basket
          </h3>
          <button
            onClick={onClose}
            aria-label="Close basket"
            style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
          {items.length === 0 ? (
            <p style={{ color: TOKENS.inkSoft, fontSize: 14.5 }}>Your basket is empty. Add a set to get started.</p>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "14px 0",
                  borderBottom: `1px solid ${TOKENS.line}`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10.5,
                      color: TOKENS.brassDark,
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    {it.code}
                  </div>
                  <div style={{ fontSize: 14.5, color: TOKENS.ink, fontWeight: 500, marginBottom: 8 }}>{it.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => onQty(it.id, -1)}
                      aria-label="Decrease quantity"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 3,
                        border: `1px solid ${TOKENS.line}`,
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: 13.5, minWidth: 14, textAlign: "center" }}>{it.qty}</span>
                    <button
                      onClick={() => onQty(it.id, 1)}
                      aria-label="Increase quantity"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 3,
                        border: `1px solid ${TOKENS.line}`,
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(it.id)}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        color: TOKENS.inkSoft,
                        fontSize: 12.5,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: 14,
                    color: TOKENS.ink,
                    whiteSpace: "nowrap",
                  }}
                >
                  {money(it.price * it.qty)}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: "18px 22px", borderTop: `1px solid ${TOKENS.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 15 }}>
            <span style={{ color: TOKENS.inkSoft }}>Subtotal</span>
            <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, color: TOKENS.ink }}>
              {money(subtotal)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            style={{
              width: "100%",
              background: items.length === 0 ? TOKENS.line : TOKENS.ink,
              color: items.length === 0 ? TOKENS.inkSoft : "#fff",
              border: "none",
              borderRadius: 3,
              padding: "13px 0",
              fontSize: 14.5,
              fontWeight: 600,
              cursor: items.length === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, half }) {
  return (
    <label style={{ display: "block", flex: half ? 1 : "unset" }}>
      <span style={{ fontSize: 12.5, color: TOKENS.inkSoft, display: "block", marginBottom: 6 }}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 3,
          padding: "11px 12px",
          fontSize: 14.5,
          fontFamily: "'Inter', sans-serif",
          background: "#fff",
          color: TOKENS.ink,
        }}
      />
    </label>
  );
}

function OrderSummary({ items, subtotal }) {
  return (
    <div
      style={{
        background: TOKENS.paperAlt,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 3,
        padding: "14px 16px",
      }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: TOKENS.inkSoft,
            marginBottom: 6,
          }}
        >
          <span>
            {it.title} {it.qty > 1 ? `× ${it.qty}` : ""}
          </span>
          <span style={{ fontFamily: "'Source Serif 4', serif" }}>{money(it.price * it.qty)}</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          fontWeight: 600,
          color: TOKENS.ink,
          marginTop: 8,
          paddingTop: 8,
          borderTop: `1px dashed ${TOKENS.line}`,
        }}
      >
        <span>Total</span>
        <span style={{ fontFamily: "'Source Serif 4', serif" }}>{money(subtotal)}</span>
      </div>
    </div>
  );
}

// Collects name + email, then asks our backend to create a real Stripe Checkout
// Session and redirects the browser there. Card details are entered on Stripe's
// own hosted page — they never touch this app or its server.
function CheckoutOverlay({ items, subtotal, onClose }) {
  const [details, setDetails] = useState({ name: "", email: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const detailsValid = details.name.trim() && details.email.trim().includes("@");

  const handleContinue = async () => {
    setError("");
    setPlacing(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({ id: it.id, title: it.title, price: it.price, qty: it.qty })),
          email: details.email,
          name: details.name,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setPlacing(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(24,35,56,0.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          background: TOKENS.paper,
          width: "min(560px, 100%)",
          borderRadius: 6,
          border: `1px solid ${TOKENS.line}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            borderBottom: `1px solid ${TOKENS.line}`,
          }}
        >
          <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600, margin: 0, color: TOKENS.ink }}>
            Your details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Full name" value={details.name} onChange={(v) => setDetails({ ...details, name: v })} placeholder="Jane Parent" />
            <Field label="Email — for your download link" value={details.email} onChange={(v) => setDetails({ ...details, email: v })} placeholder="jane@example.com" type="email" />
            <OrderSummary items={items} subtotal={subtotal} />
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: TOKENS.inkSoft, fontSize: 12.5 }}>
              <Lock size={13} /> You'll enter card details on Stripe's secure checkout page next.
            </div>
            {error && (
              <p style={{ color: TOKENS.mark, fontSize: 13, margin: 0 }}>{error}</p>
            )}
            <button
              onClick={handleContinue}
              disabled={!detailsValid || placing}
              style={{
                marginTop: 4,
                width: "100%",
                background: detailsValid && !placing ? TOKENS.brass : TOKENS.line,
                color: detailsValid && !placing ? "#fff" : TOKENS.inkSoft,
                border: "none",
                borderRadius: 3,
                padding: "13px 0",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: detailsValid && !placing ? "pointer" : "default",
              }}
            >
              {placing ? "Redirecting to secure payment…" : `Continue to payment — ${money(subtotal)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmedPage({ onBackToShop }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: TOKENS.paper,
        fontFamily: "'Inter', sans-serif",
        padding: 24,
      }}
    >
      <style>{FONTS}</style>
      <div
        style={{
          background: TOKENS.card,
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 6,
          padding: "40px 32px",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#EEF4EC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Check size={24} color="#4C7A4C" />
        </div>
        <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 23, color: TOKENS.ink, margin: "0 0 10px" }}>
          Thanks — your order's confirmed
        </h1>
        <p style={{ color: TOKENS.inkSoft, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 24px" }}>
          Check your email for your download links. They should land within a few minutes — do check your spam
          folder if you don't see them.
        </p>
        <button
          onClick={onBackToShop}
          style={{
            width: "100%",
            background: TOKENS.ink,
            color: "#fff",
            border: "none",
            borderRadius: 3,
            padding: "13px 0",
            fontSize: 14.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to shop
        </button>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${TOKENS.line}` }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "18px 0",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, fontWeight: 600 }}>{q}</span>
        <ChevronDown
          size={18}
          color={TOKENS.inkSoft}
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}
        />
      </button>
      {open && <p style={{ color: TOKENS.inkSoft, fontSize: 14.5, lineHeight: 1.65, margin: "0 0 18px" }}>{a}</p>}
    </div>
  );
}

export default function App() {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const [orderSuccess] = useState(params.get("success") === "true");

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const shopRef = useRef(null);
  const faqRef = useRef(null);
  const policiesRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const subtotal = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToFaq = () => faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToPolicies = () => policiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (orderSuccess) {
    return (
      <OrderConfirmedPage
        onBackToShop={() => {
          window.history.replaceState({}, "", window.location.pathname);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div style={{ background: TOKENS.paper, minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{FONTS}</style>

      <a
        href="#main"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
        }}
        onFocus={(e) => (e.target.style.left = "12px")}
        onBlur={(e) => (e.target.style.left = "-9999px")}
      >
        Skip to content
      </a>

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: scrolled ? "rgba(246,244,239,0.86)" : TOKENS.paper,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: `1px solid ${TOKENS.line}`,
          boxShadow: scrolled ? TOKENS.shadowSm : "none",
          transition: "background 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 10,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: TOKENS.logoYellow,
              borderRadius: 10,
              padding: "7px 12px",
            }}
          >
            <img
              src={LOGO_SRC}
              alt="ElevenPlus Scholars"
              style={{ display: "block", height: 32, width: "auto" }}
            />
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <a
              href="/slough-consortium-11-plus/"
              style={{ fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
            >
              The 2027 change
            </a>
            <button
              onClick={scrollToFaq}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              FAQs
            </button>
            <button
              onClick={scrollToPolicies}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              Policies
            </button>
            <button
              onClick={scrollToContact}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              Contact
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open basket"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "none",
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 3,
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 13.5,
                color: TOKENS.ink,
              }}
            >
              <ShoppingBag size={16} />
              Basket{count > 0 ? ` (${count})` : ""}
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "clamp(26px, 5.5vw, 56px) 24px 64px",
          }}
        >
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 420px", maxWidth: 560 }}>
                <h1
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontWeight: 600,
                    fontSize: "clamp(29px, 4.6vw, 54px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: TOKENS.ink,
                    margin: "0 0 20px",
                    textWrap: "balance",
                  }}
                >
                  Practice papers built for children sitting the Slough Consortium's new Quest Assessments 11+
                </h1>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: TOKENS.inkSoft, margin: "0 0 32px" }}>
                  From September 2027, the Slough Consortium's 11+ moves to Quest Assessments. Papers designed
                  around this new format are hard to find — each set gives your child Paper 1 (English & Verbal
                  Reasoning) and Paper 2 (Non-Verbal Reasoning & Maths), with full mark schemes included.
                </p>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <HeroButton onClick={scrollToShop} />
                  <span style={{ fontSize: 13, color: TOKENS.inkSoft }}>Instant download</span>
                </div>
              </div>
              <div
                className="hero-illustration"
                style={{ flex: "0 1 300px", display: "flex", justifyContent: "center", paddingTop: 10 }}
              >
                <PaperStack />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Shop */}
        <section ref={shopRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 72px", scrollMarginTop: 70 }}>
          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <Eyebrow>The sets</Eyebrow>
              <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 32, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 0" }}>
                Buy one set, a package, or the comprehensive range
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 20,
                marginBottom: 20,
                alignItems: "start",
              }}
            >
              {PRODUCTS.map((p) => (
                <PaperCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
            <PaperCard product={BUNDLE} onAdd={addToCart} featured />
          </Reveal>
        </section>

        {/* Trust strip */}
        <section style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}` }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
            <Reveal>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 32,
                }}
              >
                {[
                  { t: "Designed around the Slough Consortium's new format", d: "Designed around a Quest-style paper structure, since the Slough Consortium is moving to Quest Assessments.", Icon: Target },
                  { t: "Full mark schemes", d: "Every question is explained, so you can mark and understand mistakes together.", Icon: ClipboardCheck },
                  { t: "Instant download", d: "Get your papers by email straight after checkout — no waiting for post.", Icon: Bolt },
                ].map((f) => (
                  <div key={f.t}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(169,130,76,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}
                    >
                      <f.Icon size={20} color={TOKENS.brassDark} />
                    </div>
                    <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17, color: TOKENS.ink, margin: "0 0 6px" }}>{f.t}</h4>
                    <p style={{ fontSize: 14, color: TOKENS.inkSoft, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" ref={faqRef} style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px", scrollMarginTop: 70 }}>
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 20px" }}>
              Before you buy
            </h2>
            <div>
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Policies */}
        <section
          id="policies"
          ref={policiesRef}
          style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, scrollMarginTop: 70 }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px" }}>
           <Reveal>
            <Eyebrow>Before you buy</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 24px" }}>
              Delivery, refunds & contact
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Delivery
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  ElevenPlus Scholars sells digital practice papers only — no physical goods are shipped. After
                  payment, download links to your PDFs are sent to the email address you provide at checkout,
                  usually within a few minutes.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Refunds & disputes
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  If a download link doesn't arrive, a file is faulty, or a paper isn't as described, contact us
                  within 14 days of purchase and we'll fix it or refund you in full. Because these are instant
                  digital downloads, we don't offer refunds for a simple change of mind once a working download
                  link has been sent.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Cancellation rights
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  Under UK consumer law, you normally have 14 days to cancel an online purchase. By completing
                  checkout for instant-download papers, you ask us to begin delivery straight away and
                  acknowledge that you lose this cancellation right once your download link has been sent. This
                  doesn't affect your right to a refund under "Refunds & disputes" above if something's wrong
                  with what you receive.
                </p>
              </div>
              <div ref={contactRef} style={{ scrollMarginTop: 70 }}>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Contact us
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  Questions, missing downloads, or refund requests:{" "}
                  <a href="mailto:elevenpluscholars@gmail.com" style={{ color: TOKENS.ink }}>
                    elevenpluscholars@gmail.com
                  </a>
                  . We reply within 2 working days.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Independence
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  ElevenPlus Scholars is an independent publisher of practice material. We are not affiliated with,
                  endorsed by, or connected to Quest Assessments, the Slough Consortium, or any exam board. Our
                  papers are original material designed around publicly announced exam formats.
                </p>
              </div>
            </div>
           </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${TOKENS.line}` }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: TOKENS.logoYellow,
                borderRadius: 8,
                padding: "5px 9px",
              }}
            >
              <img
                src={LOGO_SRC}
                alt="ElevenPlus Scholars"
                style={{ display: "block", height: 20, width: "auto" }}
              />
            </div>
            <div style={{ fontSize: 11.5, color: TOKENS.inkSoft }}>ElevenPlus Scholars</div>
          </div>
          <a
            href="mailto:elevenpluscholars@gmail.com"
            style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: TOKENS.inkSoft, textDecoration: "none" }}
          >
            <Mail size={14} /> elevenpluscholars@gmail.com
          </a>
        </div>
      </footer>

      {count > 0 && !cartOpen && !checkoutOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 35,
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            pointerEvents: "none",
          }}
        >
          <button
            onClick={() => setCartOpen(true)}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: TOKENS.ink,
              color: "#fff",
              border: "none",
              borderRadius: 30,
              padding: "13px 22px",
              fontSize: 14.5,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(24,35,56,0.28)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: TOKENS.brass,
                borderRadius: "50%",
                width: 22,
                height: 22,
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {count}
            </span>
            {count === 1 ? "1 set added" : `${count} sets added`} — view basket & pay
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={changeQty}
        onRemove={removeItem}
        subtotal={subtotal}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutOverlay
          items={cart}
          subtotal={subtotal}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
