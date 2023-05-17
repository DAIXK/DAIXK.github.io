import{r as $,j as a}from"./index-39e59d1b.js";import{U as gt,S as ft,D as ht,n as V,e as kt}from"./save_excel-20c67c55.js";import{a as X,C as pt}from"./axios-5dd47180.js";import{F as R,a as nt,T as ot,b as wt,P as xt,D as st}from"./index-0b04bfef.js";import{I as Z,S as f,P as St}from"./index-79ab416f.js";import{B as H,E as Ct}from"./EditOutlined-7d252656.js";import{S as yt}from"./index-d3d823b7.js";import{L as bt}from"./index-ae6442ee.js";async function K(b){try{let u=0,h,p;const d="https://starkscan.stellate.sh/",l={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},r={query:`query TransactionsTableQuery(
  $first: Int!
  $after: String
  $input: TransactionsInput!
) {
  ...TransactionsTablePaginationFragment_transactions_2DAjA4
}

fragment TransactionsTableExpandedItemFragment_transaction on Transaction {
  entry_point_selector_name
  calldata_decoded
  entry_point_selector
  calldata
  initiator_address
  initiator_identifier
  main_calls {
    selector
    selector_name
    calldata_decoded
    selector_identifier
    calldata
    contract_address
    contract_identifier
    id
  }
}

fragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {
  transactions(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...TransactionsTableRowFragment_transaction
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TransactionsTableRowFragment_transaction on Transaction {
  id
  transaction_hash
  block_number
  transaction_status
  transaction_type
  timestamp
  initiator_address
  initiator_identifier
  initiator {
    is_social_verified
    id
  }
  main_calls {
    selector_identifier
    id
  }
  ...TransactionsTableExpandedItemFragment_transaction
}
`,variables:{first:30,after:null,input:{initiator_address:b,transaction_types:["INVOKE_FUNCTION"],sort_by:"timestamp",order_by:"desc",min_block_number:null,max_block_number:null,min_timestamp:null,max_timestamp:null}}},c=await X.post(d,r,{headers:l});u+=c.data.data.transactions.edges.length,h=c.data.data.transactions.pageInfo.hasNextPage;const y=c.data.data.transactions.edges[0].node.timestamp,i=new Date(y*1e3);let x=i.getFullYear(),S=i.getMonth()+1,w=i.getDate();S<10&&(S="0"+S),w<10&&(w="0"+w);let L=`${x}/${S}/${w}`;if(h===!0)for(p=c.data.data.transactions.pageInfo.endCursor;h;){r.variables.after=p;const M=await X.post(d,r,{headers:l});h=M.data.data.transactions.pageInfo.hasNextPage,p=M.data.data.transactions.pageInfo.endCursor,u+=M.data.data.transactions.edges.length}return console.log(u,L),{tx:u,stark_latest_tx:L}}catch(u){return console.error(u),{tx:"Error",stark_latest_tx:"Error"}}}async function rt(b,u,h,p){for(let d=0;d<p.length;d++){const l=p[d].node;l.transaction_hash;const r=l.transfer_amount_display,c=l.transfer_from_address;l.timestamp,l.transfer_to_identifier;const y=l.main_call?l.main_call.selector_identifier:null;if(c==="0x0000000000000000000000000000000000000000000000000000000000000000"&&y==="handle_deposit"){const i=l.from_erc20_identifier;if(i in u){const x=u[i].amount+=parseFloat(r),S=u[i].count+=1;u[i]={amount:x,count:S}}else u[i]={amount:parseFloat(r),count:1}}else if(c===b&&y==="initiate_withdraw"){const i=l.from_erc20_identifier;if(i in h){const x=h[i].amount+=parseFloat(r),S=h[i].count+=1;h[i]={amount:x,count:S}}else h[i]={amount:parseFloat(r),count:1}}}return[u,h]}async function Q(b){try{const u="https://starkscan.stellate.sh/",h={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},p={query:`query ERC20TransferEventsTableQuery(
  $first: Int!
  $after: String
  $input: ERC20TransferEventsInput!
) {
  ...ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4
}

fragment ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4 on Query {
  erc20TransferEvents(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...ERC20TransferEventsTableRowFragment_erc20TransferEvent
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment ERC20TransferEventsTableRowFragment_erc20TransferEvent on ERC20TransferEvent {
  id
  transaction_hash
  from_address
  from_erc20_identifier
  from_contract {
    is_social_verified
    id
  }
  transfer_from_address
  transfer_from_identifier
  transfer_from_contract {
    is_social_verified
    id
  }
  transfer_to_address
  transfer_to_identifier
  transfer_to_contract {
    is_social_verified
    id
  }
  transfer_amount
  transfer_amount_display
  timestamp
  main_call {
    selector_identifier
    id
  }
}
`,variables:{first:30,after:null,input:{transfer_from_or_to_address:b,call_invocation_type:"FUNCTION",sort_by:"timestamp",order_by:"desc"}}};let d=await X.post(u,p,{headers:h}),l=d.data.data.erc20TransferEvents.edges,r={},c={},y=d.data.data.erc20TransferEvents.pageInfo.hasNextPage,i;for([r,c]=await rt(b,r,c,l),y&&(i=d.data.data.erc20TransferEvents.pageInfo.endCursor);y===!0;){p.variables.after=i;let w=await X.post(u,p,{headers:h});y=w.data.data.erc20TransferEvents.pageInfo.hasNextPage,y===!1?i=null:i=w.data.data.erc20TransferEvents.pageInfo.endCursor,[r,c]=await rt(b,r,c,w.data.data.erc20TransferEvents.edges)}let x=0,S=0;for(let w in r)x+=r[w].count;for(let w in c)S+=c[w].count;return console.log(r),console.log(c),{d_eth_amount:r["StarkGate: ETH"]?parseFloat(r["StarkGate: ETH"].amount).toFixed(3):0,d_eth_count:r["StarkGate: ETH"]?r["StarkGate: ETH"].count:0,d_usdc_amount:r["StarkGate: USDC"]?parseFloat(r["StarkGate: USDC"].amount).toFixed(3):0,d_usdc_count:r["StarkGate: USDC"]?r["StarkGate: USDC"].count:0,d_usdt_amount:r["StarkGate: USDT"]?parseFloat(r["StarkGate: USDT"].amount).toFixed(3):0,d_usdt_count:r["StarkGate: USDT"]?r["StarkGate: USDT"].count:0,d_dai_amount:r["StarkGate: DAI"]?parseFloat(r["StarkGate: DAI"].amount).toFixed(3):0,d_dai_count:r["StarkGate: DAI"]?r["StarkGate: DAI"].count:0,d_wbtc_amount:r["StarkGate: WBTC"]?parseFloat(r["StarkGate: WBTC"].amount).toFixed(6):0,d_wbtc_count:r["StarkGate: WBTC"]?r["StarkGate: WBTC"].count:0,w_eth_amount:c["StarkGate: ETH"]?parseFloat(c["StarkGate: ETH"].amount).toFixed(3):0,w_eth_count:c["StarkGate: ETH"]?c["StarkGate: ETH"].count:0,w_usdc_amount:c["StarkGate: USDC"]?parseFloat(c["StarkGate: USDC"].amount).toFixed(3):0,w_usdc_count:c["StarkGate: USDC"]?c["StarkGate: USDC"].count:0,w_usdt_amount:c["StarkGate: USDT"]?parseFloat(c["StarkGate: USDT"].amount).toFixed(3):0,w_usdt_count:c["StarkGate: USDT"]?c["StarkGate: USDT"].count:0,w_dai_amount:c["StarkGate: DAI"]?parseFloat(c["StarkGate: DAI"].amount).toFixed(3):0,w_dai_count:c["StarkGate: DAI"]?c["StarkGate: DAI"].count:0,w_wbtc_amount:c["StarkGate: WBTC"]?parseFloat(c["StarkGate: WBTC"].amount).toFixed(6):0,w_wbtc_count:c["StarkGate: WBTC"]?c["StarkGate: WBTC"].count:0,total_deposit_count:x,total_widthdraw_count:S}}catch(u){return console.log(u),{d_eth_amount:"Error",d_eth_count:"Error",d_usdc_amount:"Error",d_usdc_count:"Error",d_usdt_amount:"Error",d_usdt_count:"Error",d_dai_amount:"Error",d_dai_count:"Error",d_wbtc_amount:"Error",d_wbtc_count:"Error",w_eth_amount:"Error",w_eth_count:"Error",w_usdc_amount:"Error",w_usdc_count:"Error",w_usdt_amount:"Error",w_usdt_count:"Error",w_dai_amount:"Error",w_dai_count:"Error",w_wbtc_amount:"Error",w_wbtc_count:"Error",total_deposit_count:"Error",total_widthdraw_count:"Error"}}}async function Y(b){try{const u="https://starkscan.stellate.sh/",h={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},p={query:`query ContractPageQuery(
  $input: ContractInput!
) {
  contract(input: $input) {
    contract_address
    is_starknet_class_code_verified
    implementation_type
    ...ContractPageOverviewTabFragment_contract
    ...ContractPageClassCodeHistoryTabFragment_contract
    ...ContractFunctionReadWriteTabFragment_contract
    id
  }
}

fragment ContractFunctionReadCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractFunctionReadWriteTabFragment_contract on Contract {
  contract_address
  starknet_class {
    ...ContractFunctionReadCallsFragment_starknetClass
    ...ContractFunctionWriteCallsFragment_starknetClass
    id
  }
}

fragment ContractFunctionWriteCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractPageClassCodeHistoryTabFragment_contract on Contract {
  contract_address
  starknet_class {
    is_code_verified
    id
  }
  ...ContractPageCodeSubTabFragment_contract
}

fragment ContractPageCodeSubTabFragment_contract on Contract {
  starknet_class {
    class_hash
    ...StarknetClassCodeTabFragment_starknetClass
    id
  }
}

fragment ContractPageOverviewTabClassHashPlacedAtItemFragment_contract on Contract {
  deployed_at_transaction_hash
  class_hash_placed_at_transaction_hash
  class_hash_placed_at_timestamp
}

fragment ContractPageOverviewTabEthBalanceItemFragment_contract on Contract {
  eth_balance {
    balance_display
    id
  }
}

fragment ContractPageOverviewTabFragment_contract on Contract {
  contract_address
  class_hash
  name_tag
  is_social_verified
  deployed_by_contract_address
  deployed_by_contract_identifier
  deployed_at_transaction_hash
  deployed_at_timestamp
  ...ContractPageOverviewTabEthBalanceItemFragment_contract
  ...ContractPageOverviewTabTypeItemFragment_contract
  ...ContractPageOverviewTabStarknetIDItemFragment_contract
  starknet_class {
    ...StarknetClassVersionItemFragment_starknetClass
    id
  }
  ...ContractPageOverviewTabClassHashPlacedAtItemFragment_contract
}

fragment ContractPageOverviewTabStarknetIDItemFragment_contract on Contract {
  starknet_id {
    domain
  }
}

fragment ContractPageOverviewTabTypeItemFragment_contract on Contract {
  implementation_type
  starknet_class {
    type
    id
  }
}

fragment StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
  bytecode
  sierra_program
}

fragment StarknetClassCodeTabFragment_starknetClass on StarknetClass {
  ...StarknetClassCodeTabVerifiedItemFragment_starknetClass
  ...StarknetClassCodeTabSourceCodeItemFragment_starknetClass
  ...StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass
}

fragment StarknetClassCodeTabSourceCodeItemFragment_starknetClass on StarknetClass {
  class_hash
  verified {
    source_code
  }
}

fragment StarknetClassCodeTabVerifiedItemFragment_starknetClass on StarknetClass {
  is_code_verified
  verified {
    name
    source_code
    verified_at_timestamp
  }
}

fragment StarknetClassVersionItemFragment_starknetClass on StarknetClass {
  is_cairo_one
}
`,variables:{input:{contract_address:b}}},d=await X.post(u,p,{headers:h}),l=d.data.data.contract.eth_balance.balance_display,r=d.data.data.contract.starknet_id?d.data.data.contract.starknet_id.domain:"null",c=d.data.data.contract.deployed_at_timestamp;return{eth_balance:parseFloat(l).toFixed(3),stark_id:r==="null"?"无":r,deployed_at_timestamp:c}}catch(u){return console.log(u),{eth_balance:"Error",stark_id:"Error",deployed_at_timestamp:"Error"}}}const{TextArea:Tt}=Z,{Content:It}=bt,{Column:m,ColumnGroup:W}=ot,Pt=()=>{const[b,u]=$.useState(!1),[h,p]=$.useState(!1),[d,l]=$.useState([]),[r]=R.useForm(),[c,y]=$.useState(!1),[i,x]=$.useState([]),[S,w]=$.useState(!1),[L]=R.useForm(),M={onChange:(t,o)=>{x(t)}};$.useEffect(()=>{w(!0);const t=localStorage.getItem("stark_addresses");setTimeout(()=>{w(!1)},500),t&&l(JSON.parse(t))},[]);const lt=t=>{l(d.filter(o=>o.key!==t)),localStorage.setItem("stark_addresses",JSON.stringify(d.filter(o=>o.key!==t)))},ct=async()=>{try{const t=await L.validateFields();if(t.address.length!==66&&t.address.length!==64){V.error({message:"错误",description:"请输入正确的stark地址(64位)"},2);return}t.address.startsWith("0x")||(t.address="0x"+t.address),u(!1);const o=d.findIndex(n=>n.address===t.address);if(o!==-1){l(d.map((e,_)=>_===o?{...e,name:t.name}:e));const n=[...d];Y(t.address).then(({eth_balance:e,stark_id:_,deployed_at_timestamp:s})=>{n[o]={...n[o],stark_eth_balance:e,stark_id:_,create_time:s},l(n),localStorage.setItem("stark_addresses",JSON.stringify(d))}),Q(t.address).then(({d_eth_amount:e,d_eth_count:_,d_usdc_amount:s,d_usdc_count:g,d_usdt_amount:k,d_usdt_count:C,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:j,d_wbtc_count:F,w_eth_amount:E,w_eth_count:v,w_usdc_amount:N,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_deposit_count:J,total_widthdraw_count:q})=>{n[o]={...n[o],d_eth_amount:e,d_eth_count:_,d_usdc_amount:s,d_usdc_count:g,d_usdt_amount:k,d_usdt_count:C,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:j,d_wbtc_count:F,w_eth_amount:E,w_eth_count:v,w_usdc_amount:N,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_deposit_count:J,total_widthdraw_count:q},l(n),localStorage.setItem("stark_addresses",JSON.stringify(d))}),K(t.address).then(({tx:e,stark_latest_tx:_})=>{n[o]={...n[o],stark_tx_amount:e,stark_latest_tx:_},l(n),localStorage.setItem("stark_addresses",JSON.stringify(d))})}else{const n={key:d.length.toString(),name:t.name,address:t.address,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null},e=[...d,n];l(e),K(t.address).then(({tx:_,stark_latest_tx:s})=>{n.stark_tx_amount=_,n.stark_latest_tx=s,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))}),Y(t.address).then(({eth_balance:_,stark_id:s,deployed_at_timestamp:g})=>{n.stark_eth_balance=_,n.stark_id=s,n.create_time=g,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))}),Q(t.address).then(({d_eth_amount:_,d_eth_count:s,d_usdc_amount:g,d_usdc_count:k,d_usdt_amount:C,d_usdt_count:T,d_dai_amount:I,d_dai_count:j,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:v,w_eth_count:N,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:O,w_usdt_count:P,w_dai_amount:U,w_dai_count:A,w_wbtc_amount:B,w_wbtc_count:J,total_widthdraw_count:q,total_deposit_count:z})=>{n.d_eth_amount=_,n.d_eth_count=s,n.d_usdc_amount=g,n.d_usdc_count=k,n.d_usdt_amount=C,n.d_usdt_count=T,n.d_dai_amount=I,n.d_dai_count=j,n.d_wbtc_amount=F,n.d_wbtc_count=E,n.w_eth_amount=v,n.w_eth_count=N,n.w_usdc_amount=D,n.w_usdc_count=G,n.w_usdt_amount=O,n.w_usdt_count=P,n.w_dai_amount=U,n.w_dai_count=A,n.w_wbtc_amount=B,n.w_wbtc_count=J,n.total_deposit_count=z,n.total_widthdraw_count=q,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))})}}catch(t){V.error({message:"错误",description:t.message},2)}finally{L.resetFields()}},dt=async()=>{try{const o=(await r.validateFields()).addresses.split(`
`),n=[...d];for(let e of o){if(e=e.trim(),e.length!==66&&e.length!==64){V.error({message:"错误",description:"请输入正确的stark地址(64位)"});continue}e.startsWith("0x")||(e="0x"+e);const _=n.findIndex(s=>s.address===e);if(_!==-1){const s=[...n];K(e).then(({tx:g,stark_latest_tx:k})=>{s[_]={...s[_],stark_tx_amount:g,stark_latest_tx:k},l(s),localStorage.setItem("stark_addresses",JSON.stringify(s))}),Y(e).then(({eth_balance:g,stark_id:k,deployed_at_timestamp:C})=>{s[_]={...s[_],stark_eth_balance:g,stark_id:k,create_time:C},l(s),localStorage.setItem("stark_addresses",JSON.stringify(s))}),Q(e).then(({d_eth_amount:g,d_eth_count:k,d_usdc_amount:C,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:N,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:J,w_wbtc_amount:q,w_wbtc_count:z,total_widthdraw_count:tt,total_deposit_count:et})=>{s[_]={...s[_],d_eth_amount:g,d_eth_count:k,d_usdc_amount:C,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:N,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:J,w_wbtc_amount:q,w_wbtc_count:z,total_widthdraw_count:tt,total_deposit_count:et}})}else{const s={key:n.length.toString(),address:e,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null};n.push(s),l(n),K(e).then(({tx:g,stark_latest_tx:k})=>{s.stark_tx_amount=g,s.stark_latest_tx=k,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),Y(e).then(({eth_balance:g,stark_id:k,deployed_at_timestamp:C})=>{s.stark_eth_balance=g,s.stark_id=k,s.create_time=C,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),Q(e).then(({d_eth_amount:g,d_eth_count:k,d_usdc_amount:C,d_usdc_count:T,d_usdt_amount:I,d_usdt_count:j,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:N,w_eth_amount:D,w_eth_count:G,w_usdc_amount:O,w_usdc_count:P,w_usdt_amount:U,w_usdt_count:A,w_dai_amount:B,w_dai_count:J,w_wbtc_amount:q,w_wbtc_count:z,total_widthdraw_count:tt,total_deposit_count:et})=>{s.d_eth_amount=g,s.d_eth_count=k,s.d_usdc_amount=C,s.d_usdc_count=T,s.d_usdt_amount=I,s.d_usdt_count=j,s.d_dai_amount=F,s.d_dai_count=E,s.d_wbtc_amount=v,s.d_wbtc_count=N,s.w_eth_amount=D,s.w_eth_count=G,s.w_usdc_amount=O,s.w_usdc_count=P,s.w_usdt_amount=U,s.w_usdt_count=A,s.w_dai_amount=B,s.w_dai_count=J,s.w_wbtc_amount=q,s.w_wbtc_count=z,s.total_widthdraw_count=tt,s.total_deposit_count=et,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))})}}p(!1)}catch(t){V.error({message:"错误",description:t.message})}finally{r.resetFields(),x([])}},_t=async()=>{if(!i.length){V.error({message:"错误",description:"请先选择要刷新的地址"},2);return}y(!0);try{const t=[...d];for(let o of i){const n=t.findIndex(e=>e.key===o);if(n!==-1){const e=t[n];e.stark_tx_amount=null,e.stark_latest_tx=null,e.stark_eth_balance=null,e.stark_id=null,e.create_time=null,e.d_eth_amount=null,e.d_eth_count=null,e.d_usdc_amount=null,e.d_usdc_count=null,e.d_usdt_amount=null,e.d_usdt_count=null,e.d_dai_amount=null,e.d_dai_count=null,e.d_wbtc_amount=null,e.d_wbtc_count=null,e.w_eth_amount=null,e.w_eth_count=null,e.w_usdc_amount=null,e.w_usdc_count=null,e.w_usdt_amount=null,e.w_usdt_count=null,e.w_dai_amount=null,e.w_dai_count=null,e.w_wbtc_amount=null,e.w_wbtc_count=null,e.total_widthdraw_count=null,e.total_deposit_count=null,l([...t]),K(e.address).then(({tx:_,stark_latest_tx:s})=>{e.stark_tx_amount=_,e.stark_latest_tx=s,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))}),Y(e.address).then(({eth_balance:_,stark_id:s,deployed_at_timestamp:g})=>{e.stark_eth_balance=_,e.stark_id=s,e.create_time=g,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))}),Q(e.address).then(({d_eth_amount:_,d_eth_count:s,d_usdc_amount:g,d_usdc_count:k,d_usdt_amount:C,d_usdt_count:T,d_dai_amount:I,d_dai_count:j,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:v,w_eth_count:N,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:O,w_usdt_count:P,w_dai_amount:U,w_dai_count:A,w_wbtc_amount:B,w_wbtc_count:J,total_widthdraw_count:q,total_deposit_count:z})=>{e.d_eth_amount=_,e.d_eth_count=s,e.d_usdc_amount=g,e.d_usdc_count=k,e.d_usdt_amount=C,e.d_usdt_count=T,e.d_dai_amount=I,e.d_dai_count=j,e.d_wbtc_amount=F,e.d_wbtc_count=E,e.w_eth_amount=v,e.w_eth_count=N,e.w_usdc_amount=D,e.w_usdc_count=G,e.w_usdt_amount=O,e.w_usdt_count=P,e.w_dai_amount=U,e.w_dai_count=A,e.w_wbtc_amount=B,e.w_wbtc_count=J,e.total_widthdraw_count=q,e.total_deposit_count=z,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(d))})}}}catch(t){V.error({message:"错误",description:t.message},2)}finally{y(!1),x([])}},it=()=>{l(d.filter(t=>!i.includes(t.key))),localStorage.setItem("stark_addresses",JSON.stringify(d.filter(t=>!i.includes(t.key)))),x([])},ut=()=>{kt(d,"starkInfo")},[mt,at]=$.useState(null);return a.jsx("div",{children:a.jsxs(It,{children:[a.jsx(nt,{title:"批量添加地址",open:h,onOk:dt,onCancel:()=>{p(!1),r.resetFields()},okText:"添加地址",cancelText:"取消",children:a.jsx(R,{form:r,layout:"vertical",children:a.jsx(R.Item,{label:"地址",name:"addresses",rules:[{required:!0}],children:a.jsx(Tt,{placeholder:"请输入地址，每行一个",style:{width:"500px",height:"200px"}})})})}),a.jsx(nt,{title:"添加地址",open:b,onOk:ct,onCancel:()=>u(!1),okText:"添加地址",cancelText:"取消",children:a.jsxs(R,{form:L,layout:"vertical",children:[a.jsx(R.Item,{label:"地址",name:"address",rules:[{required:!0}],children:a.jsx(Z,{placeholder:"请输入地址"})}),a.jsx(R.Item,{label:"备注",name:"name",children:a.jsx(Z,{placeholder:"请输入备注"})})]})}),a.jsx(f,{spinning:S,children:a.jsxs(ot,{rowSelection:{type:"checkbox",...M},dataSource:d,pagination:!1,bordered:!0,style:{marginBottom:"20px"},size:"small",children:[a.jsx(m,{title:"#",align:"center",render:(t,o,n)=>n+1},"index"),a.jsx(m,{title:"备注",dataIndex:"name",align:"center",className:"name",render:(t,o)=>o.key===mt?a.jsx(Z,{placeholder:"请输入备注",defaultValue:t,onPressEnter:e=>{o.name=e.target.value,l([...d]),localStorage.setItem("stark_addresses",JSON.stringify(d)),at(null)}}):a.jsxs(a.Fragment,{children:[a.jsx(wt,{color:"blue",children:t}),a.jsx(H,{shape:"circle",icon:a.jsx(Ct,{}),size:"small",onClick:()=>at(o.key)})]})},"name"),a.jsx(m,{title:"钱包地址",dataIndex:"address",align:"center",className:"address",render:(t,o)=>t===null?a.jsx(f,{}):t.slice(0,4)+"..."+t.slice(-4)},"address"),a.jsx(m,{title:"创建时间",dataIndex:"create_time",align:"center",className:"create_time",render:(t,o)=>{if(t===null)return a.jsx(f,{});{let n=new Date(t*1e3),e=n.getFullYear(),_=(n.getMonth()+1).toString().padStart(2,"0"),s=n.getDate().toString().padStart(2,"0");return`${e}/${_}/${s}`}}},"create_time"),a.jsx(m,{title:"StarkId",dataIndex:"stark_id",align:"center",className:"stark_id",render:(t,o)=>t===null?a.jsx(f,{}):t},"stark_id"),a.jsxs(W,{title:"StarkWare",className:"zksync2",children:[a.jsx(m,{title:"ETH",dataIndex:"stark_eth_balance",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"zks2_son"},"stark_eth_balance"),a.jsx(m,{title:"Tx",dataIndex:"stark_tx_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"zks2_son"},"stark_tx_amount"),a.jsx(m,{title:"最后交易时间",dataIndex:"stark_latest_tx",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"zks2_son"},"stark_latest_tx"),a.jsxs(W,{title:"官方桥Tx数量",className:"stark_cross_tx",children:[a.jsxs(W,{title:"L1->L2",className:"cross12",children:[a.jsx(m,{title:"ETH",dataIndex:"d_eth_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_eth_tx"),a.jsx(m,{title:"USDC",dataIndex:"d_usdc_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_usdc_tx"),a.jsx(m,{title:"USDT",dataIndex:"d_usdt_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_usdt_tx"),a.jsx(m,{title:"总共",dataIndex:"total_deposit_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_total_tx")]}),a.jsxs(W,{title:"L2->L1",className:"cross21",children:[a.jsx(m,{title:"ETH",dataIndex:"w_eth_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_eth_tx"),a.jsx(m,{title:"USDC",dataIndex:"w_usdc_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_usdc_tx"),a.jsx(m,{title:"USDT",dataIndex:"w_usdt_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_usdt_tx"),a.jsx(m,{title:"总共",dataIndex:"total_widthdraw_count",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_total_tx")]})]}),a.jsxs(W,{title:"官方桥跨链额",className:"stark_cross_amount",children:[a.jsxs(W,{title:"L1->L2",className:"cross12a",children:[a.jsx(m,{title:"ETH",dataIndex:"d_eth_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_eth_amount"),a.jsx(m,{title:"USDC",dataIndex:"d_usdc_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_usdc_amount"),a.jsx(m,{title:"USDT",dataIndex:"d_usdt_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"12cross_usdt_amount")]}),a.jsxs(W,{title:"L2->L1",className:"cross21a",children:[a.jsx(m,{title:"ETH",dataIndex:"w_eth_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_eth_amount"),a.jsx(m,{title:"USDC",dataIndex:"w_usdc_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_usdc_amount"),a.jsx(m,{title:"USDT",dataIndex:"w_usdt_amount",align:"center",render:(t,o)=>t===null?a.jsx(f,{}):t,className:"cross_son"},"21cross_usdt_amount")]})]})]}),a.jsx(m,{className:"action",title:"操作",align:"center",render:(t,o)=>a.jsx(yt,{size:"small",children:a.jsx(xt,{title:"确认删除？",onConfirm:()=>lt(o.key),children:a.jsx(H,{icon:a.jsx(st,{})})})})},"action")]})}),a.jsx(pt,{children:a.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:[a.jsx(H,{type:"primary",onClick:()=>{u(!0)},size:"large",style:{width:"20%"},icon:a.jsx(St,{}),children:"添加地址"}),a.jsx(H,{type:"primary",onClick:()=>{p(!0)},size:"large",style:{width:"20%"},icon:a.jsx(gt,{}),children:"批量添加地址"}),a.jsx(H,{type:"primary",onClick:_t,loading:c,size:"large",style:{width:"20%"},disabled:!i.length,icon:a.jsx(ft,{}),children:"刷新选中地址"}),a.jsx(H,{type:"primary",danger:!0,size:"large",onConfirm:it,style:{width:"20%"},disabled:!i.length,icon:a.jsx(st,{}),children:"删除选中地址"}),a.jsx(H,{type:"primary",icon:a.jsx(ht,{}),size:"large",style:{width:"8%"},onClick:ut})]})})]})})};export{Pt as default};
