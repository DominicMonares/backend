const emailTemplate = (validatedURL) => {
return `
    <div>
      <img
        src="http://drive.google.com/uc?export=view&id=1tUkKBuabpTPGwqPecF1SoRDJHyAn84ko"
        width="205"
        height="70"
      />
      <p style="font-family: 'Comic Sans MS', 'Comic Sans', cursive">
        Welcome to PetPix!
        Please verify your account by clicking the link below.
      </p>
      <button
        style="border: none;
        background-color: white;
        font-family: 'Comic Sans MS', 'Comic Sans', cursive"
      >
      ${validatedURL}
      </button>
    </div>
`
}



module.exports = emailTemplate;
