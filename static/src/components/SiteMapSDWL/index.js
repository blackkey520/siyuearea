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
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(107)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(107)}}>A1</div><Icon style={{ fontSize: 45, color:this.findColor(107)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(108)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(108)}}>A2</div><Icon style={{ fontSize: 45, color:this.findColor(108)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(109)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(109)}}>A3</div><Icon style={{ fontSize: 45, color:this.findColor(109)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(110)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(110)}}>A4</div><Icon style={{ fontSize: 45, color:this.findColor(110)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(111)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(111)}}>A5</div><Icon style={{ fontSize: 45, color:this.findColor(111)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(112)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(112)}}>A6</div><Icon style={{ fontSize: 45, color:this.findColor(112)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(113)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(113)}}>A7</div><Icon style={{ fontSize: 45, color:this.findColor(113)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(114)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(114)}}>A8</div><Icon style={{ fontSize: 45, color:this.findColor(114)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(115)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(115)}}>A9</div><Icon style={{ fontSize: 45, color:this.findColor(115)}} type="laptop" /></li>
        </ul> 
         <ul>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(116)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(116)}}>B1</div><Icon style={{ fontSize: 45, color:this.findColor(116),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(117)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(117)}}>B2</div><Icon style={{ fontSize: 45, color:this.findColor(117),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(118)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(118)}}>B3</div><Icon style={{ fontSize: 45, color:this.findColor(118),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(119)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(119)}}>B4</div><Icon style={{ fontSize: 45, color:this.findColor(119),marginLeft:0}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(120)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(120)}}>B5</div><Icon style={{ fontSize: 45, color:this.findColor(120),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(121)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(121)}}>B6</div><Icon style={{ fontSize: 45, color:this.findColor(121),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(122)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(122)}}>B7</div><Icon style={{ fontSize: 45, color:this.findColor(122),marginLeft:0}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(123)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(123)}}>B8</div><Icon style={{ fontSize: 45, color:this.findColor(123),marginLeft:0}} type="laptop" /></li>
        </ul>
            
        </div>
       深度阅读键鼠区
    <div className={styles.sitplace} >
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(124)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(124)}}>C1</div><Icon style={{ fontSize: 45, color:this.findColor(124)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(125)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(125)}}>C2</div><Icon style={{ fontSize: 45, color:this.findColor(125)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(126)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(126)}}>C3</div><Icon style={{ fontSize: 45, color:this.findColor(126)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(127)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(127)}}>C4</div><Icon style={{ fontSize: 45, color:this.findColor(127)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(128)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(128)}}>C5</div><Icon style={{ fontSize: 45, color:this.findColor(128)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(129)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(129)}}>C6</div><Icon style={{ fontSize: 45, color:this.findColor(129)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(130)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(130)}}>D1</div><Icon style={{ fontSize: 45, color:this.findColor(130)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(131)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(131)}}>D2</div><Icon style={{ fontSize: 45, color:this.findColor(131)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(132)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(132)}}>D3</div><Icon style={{ fontSize: 45, color:this.findColor(132)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(133)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(133)}}>D4</div><Icon style={{ fontSize: 45, color:this.findColor(133)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(134)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(134)}}>D5</div><Icon style={{ fontSize: 45, color:this.findColor(134)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(135)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(135)}}>D6</div><Icon style={{ fontSize: 45, color:this.findColor(135)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(136)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(136)}}>D7</div><Icon style={{ fontSize: 45, color:this.findColor(136)}} type="laptop" /></li>
        </ul>
        </div>
        深度阅读轻奢区
    <div className={styles.sitplace} >
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(137)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(137)}}>L1</div><Icon style={{ fontSize: 45, color:this.findColor(137)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(138)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(138)}}>L2</div><Icon style={{ fontSize: 45, color:this.findColor(138)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(139)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(139)}}>L3</div><Icon style={{ fontSize: 45, color:this.findColor(139)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(140)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(140)}}>L4</div><Icon style={{ fontSize: 45, color:this.findColor(140)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(141)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(141)}}>L5</div><Icon style={{ fontSize: 45, color:this.findColor(141)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(142)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(142)}}>L6</div><Icon style={{ fontSize: 45, color:this.findColor(142)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(143)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(143)}}>L7</div><Icon style={{ fontSize: 45, color:this.findColor(143)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(144)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(144)}}>L8</div><Icon style={{ fontSize: 45, color:this.findColor(144)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(145)}}><div style={{height:0,fontSize:15,marginLeft:13,marginBottom:-6,marginTop:3,color:this.findColor(145)}}>L9</div><Icon style={{ fontSize: 45, color:this.findColor(145)}} type="laptop" /></li>
        </ul>
        </div>
        </div>
        
    )
  }
}
export default SiteMap
 