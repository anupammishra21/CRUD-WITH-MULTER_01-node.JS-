const Crud = require('../models/crud.model');
const fs = require('fs');

class CrudController {
// method list

    async list(req, res) {
        try {
            let all_data = await Crud.find({ isDeleted: false }).sort({ createdAt: -1 });
            console.log("all data ",all_data);

            res.render('list', {
                title: "List",
                all_data,
                success: req.flash('success'),
                error: req.flash('error')
            })
        } catch (err) {
            throw err;
        }
    }

    // method add

    async add(req, res) {
        try {
            res.render('add', {
                title: "Add Form"
            })
        } catch (err) {
            throw err;
        }
    }

//  method insert

    async insert(req, res) {
        try {
            let check_email_exists = await Crud.findOne({ email: req.body.email, isDeleted: false });
            if (!_.isEmpty(check_email_exists)) {
                // console.log('Email already exists');
                req.flash('error', 'Email is already exists');
                res.redirect('/');
            } else {
                let check_contact_exists = await Crud.findOne({ contact: req.body.contact, isDeleted: false });
                if (!_.isEmpty(check_contact_exists)) {
                    // console.log('Contact is already exists');
                    req.flash('error', 'Contact is already exists');
                    res.redirect('/')
                } else {
                    req.body.image = req.file.filename;
                    let save_data = await Crud.create(req.body);
                    if (!_.isEmpty(save_data)) {
                        // console.log("data saved successfully!");
                        req.flash('success', 'Data save successfully!');
                        res.redirect('/')
                    }
                }
            }
        } catch (err) {
            throw err;
        }
    }

    // method edit

    async edit(req, res) {
        try {
            let user_details = await Crud.findOne({ _id: req.params.id });
            res.render('edit', {
                title: "Edit",
                user_details
            })
        } catch (err) {
            throw err;
        }
    }


// method update

    async update(req, res) {
        try {

            let user_details = await Crud.findOne({ _id: req.body.id });


            let updated_obj = {};

            updated_obj = {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                age: req.body.age
            }

            if (!_.isEmpty(req.file)) {
                updated_obj.image = req.file.filename;
                fs.unlinkSync(`./public/uploads/${user_details.image}`)
            }

            let update_data = await Crud.findByIdAndUpdate(req.body.id, updated_obj);
            if (!_.isEmpty(update_data)) {
                console.log("Data updated!!!");
                res.redirect('/')
            }
        } catch (err) {
            throw err;
        }
    }


//   method delete hard delete

    /* async delete(req, res) {
      try {
          let delete_data = await Crud.findByIdAndDelete(req.params.id);
          if (delete_data) {
              console.log("Data deleted!!!");
              res.redirect('/')
          }
      } catch (err) {
          throw err;
      }
  } */

//    method soft delete

    async delete(req, res) {
        try {
            let updated_obj = {
                isDeleted: true
            }
            let deleted_data = await Crud.findByIdAndUpdate(req.params.id, updated_obj);
            if (!_.isEmpty(deleted_data)) {
                console.log("Data delete!!!");
                res.redirect('/')
            }
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new CrudController();