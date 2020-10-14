'use strict'

var Project = require('../models/projec');
var fs = require('fs');
var path = require('path');

var controller = {
  home: function(req,res){

return res.status(200).send({
  message:'Soy una home'
});

  },
  test: function(req,res){

    return res.status(200).send({
      message:'Soy el text'
    });

  },

//guardar un projecto
  saveProject: function(req, res){
    var project = new Project();

    var params = req.body;

    project.name=params.name;
    project.description=params.description;
    project.category=params.category;
    project.year=params.year;
    project.langs=params.langs;
    project.image=null;

project.save((err,projectStored)=>{
  if(err) return res.status(500).send({
    message:"Hubo un error al guardar"
  });

  if(!projectStored) return res.status(404).send({
    message:"no se ha podido guardar"

  });

  return res.status(200).send({project: projectStored});


});





  },

//mostrar un proyecto
  getProject: function(req,res){
    var projectId = req.params.id;

if(projectId == null) return res.status(404).send({message:'El projecto no existe'});

    Project.findById(projectId,(err,project)=>{

      if(err) return res.status(500).send({
        message:"error al devolver datos"
      });

      if(!project) return res.status(404).send({
        message:"no existe"

      });

      return res.status(200).send({project});


    });
  },

//mostrar todos los proyectos
  getProjects: function(req,res){
    Project.find({}).sort('-year').exec((err,projects)=>{

      if(err) return res.status(500).send({
        message:"error al devolver datos"
      });

      if(!projects) return res.status(404).send({
        message:"no existe"

      });

      return res.status(200).send({projects});


    });


  },


//actualizar un proyectos

updateProject: function(req,res){
  var projectId = req.params.id;
  var update= req.body;

Project.findByIdAndUpdate(projectId,update,{new:true} ,(err, projectUpdate)=>{

  if(err) return res.status(500).send({
    message:"error al actualizar"
  });

  if(!projectUpdate) return res.status(404).send({
    message:"no existe el projecto para actualizar"

  });

  return res.status(200).send({project:projectUpdate});


});

},
//borrar proyecto

deleteProject:function(req,res){
  var projectId = req.params.id;
  Project.findByIdAndRemove(projectId,(err,projectRemoved)=>{

    if(err) return res.status(500).send({
      message:"no se ha podido borrar el documento"
    });

    if(!projectRemoved) return res.status(404).send({
      message:"no se puede eliminar ese proyecto"

    });

    return res.status(200).send({project:projectRemoved});

  });
},

//subir imagen

uploadImage:function(req,res){
  var projectId=req.params.id;
  var fileName = 'No subida...';

  if(req.files){
    var filePath=req.files.image.path;
    var fileSplit=filePath.split('/');
    var fileName=fileSplit[1];
    var extSplit=fileName.split('.');
    var fileExt=extSplit[1];


if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ){
  Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,projectUpdate)=>{

    if(err) return res.status(500).send({
      message:"La imagen no se ha podido subir"
    });

    if(!projectUpdate) return res.status(404).send({
      message:"La imagen o el proyecto no existe"

    });

    return res.status(200).send({project:projectUpdate});

  });
}else{
  fs.unlink(filePath,(err)=>{
    return res.status(200).send({message:'extension invalida'});

  });
}


   }else{
    return res.status(200).send({
      message:fileName
    });
  }

},

getImageFile:function(req,res){
  var file =req.params.image;
  var path_file ='./uploads/'+file;

  fs.exists(path_file,(exists)=>{

if(exists){
  return res.sendFile(path.resolve(path_file));
}else{
  return res.status(200).send({message:'No existe la imagen...'});
}

  });

}

};

module.exports = controller;
