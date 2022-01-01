import React from 'react'
import { connect } from 'react-redux';
import CardProfile from '../components/Cards/CardsCandidate/CardProfile';
import CardPageVisits from '../components/Cards/CardsCandidate/CardStats';
import WidgetLg from '../components/widgetSm/WidgetSm';

const User = () => {
   
    return (
        <div className='container'>
            <div className="w-px lg:w-4/12 px-2">
            

            <CardProfile/>
            <CardPageVisits/>
            <WidgetLg/>

            </div>
        </div>
        
       
    )
}

const mapToStateProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  });

export default connect(mapToStateProps)(User);