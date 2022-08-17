import React, { Component } from "react";
import "./pagination.scss";
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom";
class  Pagination extends Component{
    state={
        total:[],
        current:1,
        level:1,
        offset:1,
        perPage:1,
        loaded:false
    }
    componentDidMount(){
        const {currentPage,perPage,totalPages} = this.props
        const tots = []
        let pg = 1;
        for(let i = 1; i<=totalPages; i++){
            if(i%perPage === 0)
            pg+=1
            tots.push({page:i, level:pg})
        }
       this.setState({total:tots, current:currentPage, perPage:perPage})
    }
componentDidUpdate(prevProps, prevState){
    if(prevProps.currentPage !== this.props.currentPage && !this.state.loaded){
        const {currentPage,perPage} = this.props
        const {offset} = this.state
        const off = parseInt((currentPage/perPage))
        if(currentPage > perPage && currentPage%perPage !== 0){
            
            this.setState({offset:(offset+((off)*perPage)), level:off+1})
        }
        else if(currentPage > perPage && currentPage%perPage === 0){
            this.setState({offset:(offset+((off-1)*perPage)), level:off})
        }
        this.setState({current:this.props.currentPage,loaded:true})
    }
    if(prevProps.totalPages !== this.props.totalPages){
        const tots = []
        let pg = 1;
        for(let i = 1; i<=this.props.totalPages; i++){
            if(i%this.props.perPage === 0)
            pg+=1
            tots.push({page:i, level:pg})
        }
       this.setState({total:tots, perPage:this.props.perPage})
    }
}

     onNextt=(e)=>{
         const {history,onNext,perPage} = this.props
         const {current,offset,level} = this.state
        if(onNext){
            let search = history.location.search
            if(history.location.search.includes('&page='))
            {
                const split = history.location.search.split('&page')
                search =split[0]
            }
            if(e){
                const num = e.page
                this.setState({current:num})
                onNext(num)
                history.push({
                    pathname:history.location.pathname,
                    search:search+'&page='+num
                })

            }
            else{
                if(current%perPage ===0){
                    this.setState({level:(level+1), offset:(offset+perPage)})
                }
                this.setState({current:current+1})
                onNext(current+1)
                history.push({
                    pathname:history.location.pathname,
                    search:search+'&page='+(current+1)
                })
            }
        }
    }
     onPrevious=()=>{
         const {history,onPrev,perPage} = this.props
         const {current,offset,level} = this.state
         
        if(onPrev){

            let search = history.location.search
            if(history.location.search.includes('&page='))
            {
                const split = history.location.search.split('&page')
                search =split[0]
            }
            this.setState({current:current-1})
            onPrev(current-1)
            if((current-1)%perPage ===0){
                this.setState({level:level-1, offset:offset-perPage})
            }
            history.push({
                pathname:history.location.pathname,
                search:search+'&page='+(current-1)
            })
        }
    }
    render(){
        const {totalPages,perPage}= this.props
        const {current,offset,level,total} = this.state
    return(
        <div className="s-nav-pagination">
            <ul>
                {
                    totalPages>1?
                    <>
                    {
                        current>1?
                        <li>
                            <button onClick={this.onPrevious} type="button">B</button>
                        </li>
                        :
                        <li>
                            <button className="disabled" type="button">B</button>
                        </li>
                    }
                    {
                        total.map((page,i)=>{

                            // if(page.page>(3*level) && page.page<(5*level) && totalPages > 6*level)
                            // return (
                            //     <li key={i}>
                            //         <button type="button" >...</button>
                            //     </li>
                            //     )
                            if(page.page<=perPage*level && page.page >= offset)
                           return (
                            <li key={i}>
                                <button type="button" onClick={(e)=>this.onNextt(page)} className={`${current === page.page?'snav-active':''}`}>{page.page}</button>
                            </li>
                            )
                            return ''
                    })
                    }
                    {
                        current < totalPages?
                        <li>
                            <button onClick={()=>this.onNextt()} type="button">N</button>
                        </li>
                        :
                        <li>
                            <button className="disabled"  type="button">N</button>
                        </li>
                    }
                    </>
                :''
                }
            </ul>
        </div>
    )
}
}
export default withRouter(Pagination);

Pagination.propTypes={
    totalPages:PropTypes.number,
    currentPage:PropTypes.number,
    onNext:PropTypes.func,
    onPrev:PropTypes.func,
    perPage:PropTypes.number,
}
Pagination.defaultProps={
    totalPages:5,
    currentPage:1,
    perPage:5,
    onNext:null,
    onPrev:null
}