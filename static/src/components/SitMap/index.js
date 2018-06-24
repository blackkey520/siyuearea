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
         if(!this.props.selectPid)
         {
            const item=this.state.sitemap.find((value, index, arr)=>value.pid===key)
            if(item){
                this.setState((state)=>{
                    const sitelist=state.sitemap;
                    sitelist.map((item,index,arr)=>{
                        if(item.pstate===0||item.pstate===3)
                        {
                            if(item.pid===key){
                                if(item.pstate===0){
                                    item.pstate=3;
                                }else{
                                    item.pstate=0;
                                }
                            }else{
                                item.pstate=0;
                            }   
                        }
                    })
                    return {
                        sitemap:sitelist
                    }
                })
            }
         }
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
            正在使用<Icon style={{ marginLeft:15,fontSize: 15, color:'#40b86e'}} type="minus-square" />已选</div>
     <div style={{
            border: "1px solid #ddd",
            padding:10,
            width:'450px',
            height:'270px'
        }}>
    <div className={styles.sitplace} style={{
        borderRight: "1px dashed #ddd",
        float:'left',
        width:'300px'
    }}>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(1)}}><Icon style={{ fontSize: 25, color:this.findColor(1)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(2)}}><Icon style={{ fontSize: 25, color:this.findColor(2)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(3)}}><Icon style={{ fontSize: 25, color:this.findColor(3)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(4)}}><Icon style={{ fontSize: 25, color:this.findColor(4)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(5)}}><Icon style={{ fontSize: 25, color:this.findColor(5)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(6)}}><Icon style={{ fontSize: 25, color:this.findColor(6)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(7)}}><Icon style={{ fontSize: 25, color:this.findColor(7)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(8)}}><Icon style={{ fontSize: 25, color:this.findColor(8)}} type="laptop" /></li>
        </ul>
        <br/>
         <ul>
          <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(9)}}><Icon style={{ fontSize: 25, color:this.findColor(9)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(10)}}><Icon style={{ fontSize: 25, color:this.findColor(10)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(11)}}><Icon style={{ fontSize: 25, color:this.findColor(11)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(12)}}><Icon style={{ fontSize: 25, color:this.findColor(12)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(13)}}><Icon style={{ fontSize: 25, color:this.findColor(13)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(14)}}><Icon style={{ fontSize: 25, color:this.findColor(14)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(15)}}><Icon style={{ fontSize: 25, color:this.findColor(15)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(16)}}><Icon style={{ fontSize: 25, color:this.findColor(16)}} type="laptop" /></li>
        </ul>
            <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(17)}}><Icon style={{ fontSize: 25, color:this.findColor(17)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(18)}}><Icon style={{ fontSize: 25, color:this.findColor(18)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(19)}}><Icon style={{ fontSize: 25, color:this.findColor(19)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(20)}}><Icon style={{ fontSize: 25, color:this.findColor(20)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(21)}}><Icon style={{ fontSize: 25, color:this.findColor(21)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(22)}}><Icon style={{ fontSize: 25, color:this.findColor(22)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(23)}}><Icon style={{ fontSize: 25, color:this.findColor(23)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(24)}}><Icon style={{ fontSize: 25, color:this.findColor(24)}} type="laptop" /></li>
        </ul>
        <br/>
            <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(25)}}><Icon style={{ fontSize: 25, color:this.findColor(25)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(26)}}><Icon style={{ fontSize: 25, color:this.findColor(26)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(27)}}><Icon style={{ fontSize: 25, color:this.findColor(27)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(28)}}><Icon style={{ fontSize: 25, color:this.findColor(28)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(29)}}><Icon style={{ fontSize: 25, color:this.findColor(29)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(30)}}><Icon style={{ fontSize: 25, color:this.findColor(30)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(31)}}><Icon style={{ fontSize: 25, color:this.findColor(31)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(32)}}><Icon style={{ fontSize: 25, color:this.findColor(32)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(33)}}><Icon style={{ fontSize: 25, color:this.findColor(33)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(34)}}><Icon style={{ fontSize: 25, color:this.findColor(34)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(35)}}><Icon style={{ fontSize: 25, color:this.findColor(35)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(36)}}><Icon style={{ fontSize: 25, color:this.findColor(36)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(37)}}><Icon style={{ fontSize: 25, color:this.findColor(37)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(38)}}><Icon style={{ fontSize: 25, color:this.findColor(38)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(39)}}><Icon style={{ fontSize: 25, color:this.findColor(39)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(40)}}><Icon style={{ fontSize: 25, color:this.findColor(40)}} type="laptop" /></li>
        </ul>
        <br/>
        <ul>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(41)}}><Icon style={{ fontSize: 25, color:this.findColor(41)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(42)}}><Icon style={{ fontSize: 25, color:this.findColor(42)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(43)}}><Icon style={{ fontSize: 25, color:this.findColor(43)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(44)}}><Icon style={{ fontSize: 25, color:this.findColor(44)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(45)}}><Icon style={{ fontSize: 25, color:this.findColor(45)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(46)}}><Icon style={{ fontSize: 25, color:this.findColor(46)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(47)}}><Icon style={{ fontSize: 25, color:this.findColor(47)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(48)}}><Icon style={{ fontSize: 25, color:this.findColor(48)}} type="laptop" /></li>
        </ul>
        <ul>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(49)}}><Icon style={{ fontSize: 25, color:this.findColor(49)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(50)}}><Icon style={{ fontSize: 25, color:this.findColor(50)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(51)}}><Icon style={{ fontSize: 25, color:this.findColor(51)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(52)}}><Icon style={{ fontSize: 25, color:this.findColor(52)}} type="laptop" /></li>
             <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(53)}}><Icon style={{ fontSize: 25, color:this.findColor(53)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(54)}}><Icon style={{ fontSize: 25, color:this.findColor(54)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(55)}}><Icon style={{ fontSize: 25, color:this.findColor(55)}} type="laptop" /></li>
            <li style={{cursor:'pointer'}} onClick={()=>{this.itemClick(56)}}><Icon style={{ fontSize: 25, color:this.findColor(56)}} type="laptop" /></li>
        </ul>
        </div>
        <div style={{float:'right',width:'100px'}}>
            <a style={{cursor:'pointer'}} onClick={()=>{this.itemClick(57)}}><Icon style={{ fontSize: 80, color:this.findColor(57)}} type="scan" /></a>
            <a style={{cursor:'pointer'}} onClick={()=>{this.itemClick(58)}}><Icon style={{ fontSize: 80, color:this.findColor(58)}} type="scan" /></a>
        </div>
        </div>
        </div>
    )
  }
}
export default SiteMap
 