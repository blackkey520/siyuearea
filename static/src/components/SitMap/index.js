import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';
 

class SiteMap extends React.Component {
  constructor(props, context) {
		super(props, context);
		this.state={
			sitemap:props.sitemap
		}
    }
    itemClick=(key)=>{
        this.props.placeClick(key);
    }
    findColor=(key)=>{
        let color='grey';
        const item=this.state.sitemap.find((value, index, arr)=>value.pid===key)
        if(this.props.selectPid)
        {
            
            if(item.pid===this.props.selectPid)
            {
                color='#40b86e';
            }
        }else{
            if(item)
            {
                if(item.pstate==1)//已定
                {
                    color='#e97330'; 
                }
                else if(item.pstate==2)//使用中
                {
                    color='#f93533';
                }
                else if(item.pstate==3)
                {
                    color='#40b86e';
                }else if(item.pstate==4)
                {
                    color='blue'
                }
            }
        }
        return color;
    }
    getselectItem=()=>{
        const item=this.state.sitemap.find((value, index, arr)=>value.pstate===3);
        return item;
    }
  render () {
    return (
        <div style={{...this.props.style}}>
            <div style={{padding:5}}><Icon style={{marginLeft:15,fontSize: 15, color:'grey'}} type="minus-square" />
            可选<Icon style={{ marginLeft:15,fontSize: 15, color:'#e97330'}} type="minus-square" />
            已经预订<Icon style={{ marginLeft:15,fontSize: 15, color:'#f93533'}} type="minus-square" />
            正在使用<Icon style={{ marginLeft:15,fontSize: 15, color:'blue'}} type="minus-square" />
            试用</div>
    深度阅读标准区
    <div className={styles.sitplace} >
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(1)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(1)}}>A1</div><Icon style={{ fontSize: 45, color:this.findColor(1)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(2)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(2)}}>A2</div><Icon style={{ fontSize: 45, color:this.findColor(2)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(3)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(3)}}>A3</div><Icon style={{ fontSize: 45, color:this.findColor(3)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(4)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(4)}}>A4</div><Icon style={{ fontSize: 45, color:this.findColor(4)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(5)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(5)}}>A5</div><Icon style={{ fontSize: 45, color:this.findColor(5)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(6)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(6)}}>A6</div><Icon style={{ fontSize: 45, color:this.findColor(6)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(7)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(7)}}>A7</div><Icon style={{ fontSize: 45, color:this.findColor(7)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(8)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(8)}}>A8</div><Icon style={{ fontSize: 45, color:this.findColor(8)}} type="laptop" /></li>
        </ul>
        <div style={{height:7}}></div>
         <ul>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(9)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(9)}}>B1</div><Icon style={{ fontSize: 45, color:this.findColor(9),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(10)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(10)}}>B2</div><Icon style={{ fontSize: 45, color:this.findColor(10),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(11)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(11)}}>B3</div><Icon style={{ fontSize: 45, color:this.findColor(11),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(12)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(12)}}>B4</div><Icon style={{ fontSize: 45, color:this.findColor(12),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(13)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(13)}}>B5</div><Icon style={{ fontSize: 45, color:this.findColor(13),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(14)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(14)}}>B6</div><Icon style={{ fontSize: 45, color:this.findColor(14),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(15)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(15)}}>B7</div><Icon style={{ fontSize: 45, color:this.findColor(15),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(16)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(16)}}>B8</div><Icon style={{ fontSize: 45, color:this.findColor(16),marginLeft:0}} type="laptop" /></li>
        </ul>
            <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(17)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(17)}}>C1</div><Icon style={{ fontSize: 45, color:this.findColor(17),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(18)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(18)}}>C2</div><Icon style={{ fontSize: 45, color:this.findColor(18),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(19)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(19)}}>C3</div><Icon style={{ fontSize: 45, color:this.findColor(19),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(20)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(20)}}>C4</div><Icon style={{ fontSize: 45, color:this.findColor(20),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(21)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(21)}}>C5</div><Icon style={{ fontSize: 45, color:this.findColor(21),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(22)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(22)}}>C6</div><Icon style={{ fontSize: 45, color:this.findColor(22),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(23)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(23)}}>C7</div><Icon style={{ fontSize: 45, color:this.findColor(23),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(24)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(24)}}>C8</div><Icon style={{ fontSize: 45, color:this.findColor(24),marginLeft:0}} type="laptop" /></li>
        </ul>
       <div style={{height:7}}></div>
            <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(25)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(25)}}>D1</div><Icon style={{ fontSize: 45, color:this.findColor(25),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(26)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(26)}}>D2</div><Icon style={{ fontSize: 45, color:this.findColor(26),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(27)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(27)}}>D3</div><Icon style={{ fontSize: 45, color:this.findColor(27),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(28)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(28)}}>D4</div><Icon style={{ fontSize: 45, color:this.findColor(28),marginLeft:0}}  type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(29)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(29)}}>D5</div><Icon style={{ fontSize: 45, color:this.findColor(29),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(30)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(30)}}>D6</div><Icon style={{ fontSize: 45, color:this.findColor(30),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(31)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(31)}}>D7</div><Icon style={{ fontSize: 45, color:this.findColor(31),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(32)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(32)}}>D8</div><Icon style={{ fontSize: 45, color:this.findColor(32),marginLeft:0}}  type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(33)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(33)}}>E1</div><Icon style={{ fontSize: 45, color:this.findColor(33),marginLeft:0}}  type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(34)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(34)}}>E2</div><Icon style={{ fontSize: 45, color:this.findColor(34),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(35)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(35)}}>E3</div><Icon style={{ fontSize: 45, color:this.findColor(35),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(36)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(36)}}>E4</div><Icon style={{ fontSize: 45, color:this.findColor(36),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(37)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(37)}}>E5</div><Icon style={{ fontSize: 45, color:this.findColor(37),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(38)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(38)}}>E6</div><Icon style={{ fontSize: 45, color:this.findColor(38),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(39)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(39)}}>E7</div><Icon style={{ fontSize: 45, color:this.findColor(39),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(40)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(40)}}>E8</div><Icon style={{ fontSize: 45, color:this.findColor(40),marginLeft:0}} type="laptop" /></li>
        </ul>
        <div style={{height:7}}></div>
        <ul>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(41)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(41)}}>F1</div><Icon style={{ fontSize: 45, color:this.findColor(41),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(42)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(42)}}>F2</div><Icon style={{ fontSize: 45, color:this.findColor(42),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(43)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(43)}}>F3</div><Icon style={{ fontSize: 45, color:this.findColor(43),marginLeft:0}}type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(44)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(44)}}>F4</div><Icon style={{ fontSize: 45, color:this.findColor(44),marginLeft:0}}type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(45)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(45)}}>F5</div><Icon style={{ fontSize: 45, color:this.findColor(45),marginLeft:0}}type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(46)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(46)}}>F6</div><Icon style={{ fontSize: 45, color:this.findColor(46),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(47)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(47)}}>F7</div><Icon style={{ fontSize: 45, color:this.findColor(47),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(48)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(48)}}>F8</div><Icon style={{ fontSize: 45, color:this.findColor(48),marginLeft:0}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(49)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(49)}}>G1</div><Icon style={{ fontSize: 45, color:this.findColor(49),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(50)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(50)}}>G2</div><Icon style={{ fontSize: 45, color:this.findColor(50),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(51)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(51)}}>G3</div><Icon style={{ fontSize: 45, color:this.findColor(51),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(52)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(52)}}>G4</div><Icon style={{ fontSize: 45, color:this.findColor(52),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(53)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(53)}}>G5</div><Icon style={{ fontSize: 45, color:this.findColor(53),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(54)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(54)}}>G6</div><Icon style={{ fontSize: 45, color:this.findColor(54),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(55)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(55)}}>G7</div><Icon style={{ fontSize: 45, color:this.findColor(55),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(56)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(56)}}>G8</div><Icon style={{ fontSize: 45, color:this.findColor(56),marginLeft:0}} type="laptop" /></li>
        </ul>
        </div>
       深度阅读键鼠区
    <div className={styles.sitplace} >
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(96)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(96)}}>H1</div><Icon style={{ fontSize: 45, color:this.findColor(96)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(97)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(97)}}>H2</div><Icon style={{ fontSize: 45, color:this.findColor(97)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(98)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(98)}}>H3</div><Icon style={{ fontSize: 45, color:this.findColor(98)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(99)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(99)}}>H4</div><Icon style={{ fontSize: 45, color:this.findColor(99)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(100)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(100)}}>H5</div><Icon style={{ fontSize: 45, color:this.findColor(100)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(101)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(101)}}>K1</div><Icon style={{ fontSize: 45, color:this.findColor(101)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(102)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(102)}}>K2</div><Icon style={{ fontSize: 45, color:this.findColor(102)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(103)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(103)}}>K3</div><Icon style={{ fontSize: 45, color:this.findColor(103)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(104)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(104)}}>K4</div><Icon style={{ fontSize: 45, color:this.findColor(104)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(105)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(105)}}>K5</div><Icon style={{ fontSize: 45, color:this.findColor(105)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(106)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(106)}}>K6</div><Icon style={{ fontSize: 45, color:this.findColor(106)}} type="laptop" /></li>
        </ul>
        </div>
        </div>
    )
  }
}
export default SiteMap
 