module.exports = {
  checked: function (step) {
    console.log("   ✅ " + step)
  },
  error: function (step) {
    console.log("   ❌ " + step)
  },
  starScenario: async function (title){
    console.log(title);
  }
};