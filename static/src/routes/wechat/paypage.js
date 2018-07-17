import React from "react";
import { connect } from "dva";

@connect()
class PayPage extends React.Component {
  render() {
    return (
        <div style={{width:'100%'}}> 
         <a onClick={()=>{
               const attach = `{"type": 2,"money": 'tets1',"mtype": 'tweq',"title":123}`;
               const url = `http://${self.location.host}/paytest/${attach}`;
               window.open(url, "_self");
              }}>提交</a>
        </div>
      );
  }
}

export default PayPage;
