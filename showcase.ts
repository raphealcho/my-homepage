export const brands = [
 {name:'TAKAGI',x:29,y:30},{name:'KAKURI',x:146,y:30},{name:'RINREI',x:262,y:30},{name:'TAKAMORI',x:379,y:30},{name:'KOKUBO',x:495,y:30},{name:'Saboten',x:612,y:30},
 {name:'TORIBE',x:29,y:197},{name:'SATAKE',x:146,y:197},{name:'musashi',x:262,y:197},{name:'TUBOTA',x:379,y:197},
 {name:'DH PUMP',image:'dh-pump-transparent.png'},{name:'CAS',image:'cas-transparent.png'},{name:'HIOKI',image:'hioki-transparent.png'},
];
// Sales quantities and qualifiers supplied by KIKAE; these are product-level results.
export type SalesCase={id:string;brand:string;image:string;name:{en:string;jp:string;kr:string};units:number;approximate:boolean;atLeast:boolean};
export const salesCases:SalesCase[]=[
 {id:'garden',brand:'TAKAGI',image:'industrial.png',name:{en:'Watering & garden equipment',jp:'散水・ガーデニング用品',kr:'급수·원예용품'},units:10000,approximate:false,atLeast:true},
 {id:'precision',brand:'HIOKI',image:'measuring.png',name:{en:'Electrical measuring instruments',jp:'電気計測器',kr:'전기 측정기기'},units:5000,approximate:true,atLeast:true},
 {id:'safety',brand:'3M',image:'safety.png',name:{en:'Respiratory protection',jp:'呼吸用保護具',kr:'호흡 보호구'},units:6000,approximate:true,atLeast:true},
 {id:'pump',brand:'DAEHWA ELECTRIC',image:'daehwa-pump-dark.png',name:{en:'Submersible pump',jp:'水中ポンプ',kr:'대화전기 수중펌프'},units:2000,approximate:true,atLeast:false},
];
