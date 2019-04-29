import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';
import { Flex } from '_antd-mobile@2.2.1@antd-mobile';
 

class SitMapDWL extends React.Component {
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
            <div style={{padding:10}}><Icon style={{marginLeft:15,fontSize: 15, color:'grey'}} type="minus-square" />
            可选<Icon style={{ marginLeft:15,fontSize: 15, color:'#e97330'}} type="minus-square" />
            已经预定<Icon style={{ marginLeft:15,fontSize: 15, color:'#f93533'}} type="minus-square" />
            正在使用<Icon style={{ marginLeft:15,fontSize: 15, color:'blue'}} type="minus-square" />
            试用</div>
    
    <div className={styles.sitplace} style={{marginLeft:150}}>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(59)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(59)}}>A1</div><Icon style={{ fontSize: 50, color:this.findColor(59)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(61)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(61)}}>B1</div><Icon style={{ fontSize: 50, color:this.findColor(61)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(63)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(63)}}>C1</div><Icon style={{ fontSize: 50, color:this.findColor(63)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(65)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(65)}}>D1</div><Icon style={{ fontSize: 50, color:this.findColor(65)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(67)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(67)}}>E1</div><Icon style={{ fontSize: 50, color:this.findColor(67)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(69)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(69)}}>F1</div><Icon style={{ fontSize: 50, color:this.findColor(69)}} type="laptop" /></li>
        </ul>
         <ul>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(60)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(60)}}>A2</div><Icon style={{ fontSize: 50, color:this.findColor(60),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(62)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(62)}}>B2</div><Icon style={{ fontSize: 50, color:this.findColor(62),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(64)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(64)}}>C2</div><Icon style={{ fontSize: 50, color:this.findColor(64),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(66)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(66)}}>D2</div><Icon style={{ fontSize: 50, color:this.findColor(66),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(68)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(68)}}>E2</div><Icon style={{ fontSize: 50, color:this.findColor(68),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(70)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(70)}}>F2</div><Icon style={{ fontSize: 50, color:this.findColor(70),marginLeft:0}} type="laptop" /></li>
        </ul>
             
        </div>
          <div className={styles.sitplace2} style={{display:'flex',flexDirection:'row',marginTop:10}}>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(71)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(71)}}>A3</div><Icon style={{ fontSize: 50, color:this.findColor(71)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(72)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(72)}}>A4</div><Icon style={{ fontSize: 50, color:this.findColor(72)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(73)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(73)}}>A5</div><Icon style={{ fontSize: 50, color:this.findColor(73)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(74)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(74)}}>A6</div><Icon style={{ fontSize: 50, color:this.findColor(74)}} type="laptop" /></li>
        </ul>
         <ul style={{marginLeft:15}}>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(75)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(75)}}>B3</div><Icon style={{ fontSize: 50, color:this.findColor(75),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(76)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(76)}}>B4</div><Icon style={{ fontSize: 50, color:this.findColor(76),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(77)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(77)}}>B5</div><Icon style={{ fontSize: 50, color:this.findColor(77)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(78)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(78)}}>B6</div><Icon style={{ fontSize: 50, color:this.findColor(78)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(79)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(79)}}>C3</div><Icon style={{ fontSize: 50, color:this.findColor(79)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(80)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(80)}}>C4</div><Icon style={{ fontSize: 50, color:this.findColor(80)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(81)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(81)}}>C5</div><Icon style={{ fontSize: 50, color:this.findColor(81)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(82)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(82)}}>C6</div><Icon style={{ fontSize: 50, color:this.findColor(82)}} type="laptop" /></li>
        </ul> 
        <ul style={{marginLeft:15}}>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(83)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(83)}}>D3</div><Icon style={{ fontSize: 50, color:this.findColor(83),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(84)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(84)}}>D4</div><Icon style={{ fontSize: 50, color:this.findColor(84),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(85)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(85)}}>D5</div><Icon style={{ fontSize: 50, color:this.findColor(85)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(86)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(86)}}>D6</div><Icon style={{ fontSize: 50, color:this.findColor(86)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(87)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(87)}}>E3</div><Icon style={{ fontSize: 50, color:this.findColor(87)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(88)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(88)}}>E4</div><Icon style={{ fontSize: 50, color:this.findColor(88)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(89)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(89)}}>E5</div><Icon style={{ fontSize: 50, color:this.findColor(89)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(90)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(90)}}>E6</div><Icon style={{ fontSize: 50, color:this.findColor(90)}} type="laptop" /></li>
        </ul> 
         <ul style={{marginLeft:15}}>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(91)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(91)}}>F3</div><Icon style={{ fontSize: 50, color:this.findColor(91),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(92)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(92)}}>F4</div><Icon style={{ fontSize: 50, color:this.findColor(92),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(93)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(93)}}>F5</div><Icon style={{ fontSize: 50, color:this.findColor(93)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(94)}}><div style={{height:0,fontSize:20,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(94)}}>F6</div><Icon style={{ fontSize: 50, color:this.findColor(94)}} type="laptop" /></li>
        </ul>
        </div>
        </div>
    )
  }
}
export default SitMapDWL
 