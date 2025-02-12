function skillsMember() {

  var member = {
    skills: ["JavaScript", "React", "Redux"],
    // add a new skill to the member
    addSkill: function(skill) {
      this.skills.push(skill);
    }
  };

  member.addSkill("Node.js");

  return member.skills;
}