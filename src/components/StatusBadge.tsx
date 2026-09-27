import {theme} from '../theme/tokens';
export const StatusBadge = ({label,active=false}:{label:string;active?:boolean})=><span style={{padding:'8px 12px',borderRadius:999,border:`1px solid ${active?theme.green:theme.border}`,color:active?theme.green:theme.muted,background:active?'#12342f':theme.raised,fontSize:17,fontWeight:700}}>{label}</span>;
