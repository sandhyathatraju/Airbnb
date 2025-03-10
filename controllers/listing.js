const Listing=require("../modules/listing");
// show all listings
module.exports.index = async (req, res) => {
    try {
        let query = {};
        if (req.query.country) {
            query.country = { $regex: req.query.country, $options: "i" }; 
        }

        //console.log("Search Query Received:", query);
        const allListings = await Listing.find(query);
        console.log("🔍 Listings Found:", allListings); 

        res.render("listings/list.ejs", { allListings });
    } catch (error) {
        console.error(" Error fetching listings:", error);
        res.status(500).send("Internal Server Error");
    }
};

 
// add new list    
module.exports.newList=(req,res)=>
    { 
       
        res.render("listings/new.ejs");
    } 
// showing the list    
module.exports.showList=async(req,res)=>
        {
            let {id}=req.params;
            //console.log(id);
            const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
            listing.owner = listing.owner.toObject(); 
           //console.log(listing)
           if(!listing)
           {
            req.flash("error","Listing you requested in not existed ");
            res.redirect("/listings");
           }
            res.render("listings/show.ejs",{listing});
        } 
// add the new list        
module.exports.validateList=async(req,res,next)=>
    {
        let url=req.file.path;
        let filename=req.file.filename;
        const newListing=new Listing(req.body.listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        req.flash("success","New listing Created");
        res.redirect("/listings");
    }
// Edit the list
module.exports.editList=async(req,res)=>
    {
        let {id}=req.params; 
        //console.log(id);
        const listing=await Listing.findById(id);
        if(!listing)
            {
             req.flash("error","Listing you requested in not existed ");
             res.redirect("/listings");
            }
       // req.flash("success","Listing Updated");
        let originalUrl=listing.image.url;
        originalUrl=originalUrl.replace("/upload","/upload/h_200,w_300");
        res.render("listings/edit.ejs",{listing,originalUrl});
    }    
// update list
module.exports.updateList=async(req,res)=>
    {
        let {id}=req.params;  
        let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
        if(typeof req.file !=="undefined")
        {
            let url=req.file.path;
            let filename=req.file.filename;
            listing.image={url,filename};
            await listing.save();
        }
        res.redirect(`/listings/${id}`);
    }
// Delete List
module.exports.deleteList=async(req,res)=>
    {
        let {id}=req.params;
        let deletedlisting=await Listing.findByIdAndDelete(id);
        //console.log(id);
        req.flash("success","List Deleted");
        res.redirect("/listings");
    }    
