const mongoose = require('mongoose')
const Customer = require('../models/CustomerModel')

/**
 *   GET/ 
 *   HomePage
 */

// //Pagination Logic

// exports.homepage = async(req,res)=>{
  
//   const locals={
//     title: 'Nodejs',
//     description: 'Free NodeJS user management system'
//   }

//   let perPage = 10;
//   let page = req.query.page || 1

//    try{
//     const customers = Customer.aggregate([{$sort: {updatedAt: 1}}])
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec();
    
//     const count= await Customer.countDocuments()

//      res.render('index' , 
//      { locals, 
//       customers,
//       current: page,
//       pages: Math.ceil(count/ perPage)
//     })
  
//    }catch(err){
//      console.log(err)
//    }

// }


exports.homepage = async(req,res)=>{
  
  const locals={
    title: 'Nodejs',
    description: 'Free NodeJS user management system'
  }

   try{
     const customers = await Customer.find({}).limit(10)
     res.render('index' , { locals, customers})
  
   }catch(err){
     console.log(err)
   }


}

/**
 *   GET/ 
 *   About Page
 */


exports.aboutPage = async(req,res)=>{
  
  const locals={
    title: 'About',
    description: 'Free NodeJS user management system'
  }

   try{
    
     res.render('about' ,locals)
  
   }catch(err){
     console.log(err)
   }


}


/**
 *   GET/ 
 *   New Customer form
 */

exports.addCustomer = async(req,res)=>{
  
  
  const locals={
    title: 'Add new customer',
    description: 'Free NodeJS user management system'
  }
  
   res.render('customer/add' , locals)

}


/**
 *   GET/ 
 *    Customer data by its ID
 */

exports.view = async(req,res)=>{
    
  try{
    const customer = await Customer.findOne({_id : req.params.id })
   
    const locals={
      title: 'View costumer data',
      description: 'Free NodeJS user management system'
    }
  
   res.render('customer/view' ,
   { locals,
    customer})


  }catch(err){
    console.log(err)
  }
 

}

/**
 *   POST/ 
 *   POST New Customer form
 */

exports.postCustomer= async(req,res)=>{

  console.log(req.body)
  
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

 try{
     await Customer.create(newCustomer)

     res.redirect('/')

 }catch(err){
  console.log(err)
 }
}

/**
 *   GET/ 
 *  Edit the customer
 */
exports.edit = async(req,res)=>{
 
  try{
    const customer = await Customer.findOne({_id : req.params.id })
   
    const locals={
      title: 'Edit costumer data',
      description: 'Free NodeJS user management system'
    }
  
   res.render('customer/edit' ,
   { locals,
    customer})


  }catch(err){
    console.log(err)
  }

}

/**
 *   PUT/ 
 *  Edit the customer data
 */

exports.editPost = async(req,res)=>{
  try{

    await Customer.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel, 
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now()
    })   

    await res.redirect( `/edit/${req.params.id}`)

  }catch(err){
    
    console.log(err)

  }
}


/**
 *   DELETE/ 
 *  DELETE the customer record
 */

exports.deleteCustomer = async(req,res)=>{
  try{
  
    await Customer.deleteOne({_id: req.params.id})
  res.redirect("/")

  }catch(err){
    
    console.log(err)

  }
}



/**
 *   GET/ 
 *  Search the customer record
 */

exports.searchCustomer = async(req,res)=>{
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
}