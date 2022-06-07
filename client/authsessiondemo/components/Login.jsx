import React from 'react'

const Login = () => {
  return (
    <div className="container h-100">
      <div className="card row h-100 justify-content-center align-items-center" style={{width: 36+`rem`}}>
  <div className="card-body">
  <form>
      <div className="mb-3 row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control" id="staticEmail" 
      />
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword"/>
    </div>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
  </div>
      </form>  
  </div>
</div> 
         
  </div>
  )
}

export default Login