import React from 'react'; 
import ReactDOM from 'react-dom'; 
import nock from 'nock'; 
import App from '../App';

it('renders without crashing', () => { 
   const scope = nock('http://myapi.com') 
   .post('/subscription')
   .reply(200, { success: true, data: [{ id: 1, name: 'nocked data' }] }, 
   { 
     'Access-Control-Allow-Origin': '*', 
     'Content-type': 'application/json' 
   }); 
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
   ReactDOM.unmountComponentAtNode(div); 
});