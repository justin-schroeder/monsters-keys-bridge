const prompts = require('prompts');

let hasLeftKey = false
let hasMiddleKey = false
let hasRightKey = false
let hasSword = false
let hasTrollKey = false

async function firstRoom() {
  const { answer } = await prompts({
    type: 'select',
    name: 'answer',
    message: 'You are in a dark room, the night before halloween. There is a door on your left and one on your right. One will be helpful and one will be....not so good. Which do you pick?',
    choices: [
      { title: 'Left', value: threeKeysRoom },
      { title: 'Right', value: narrowBridge },
    ],
  })
  answer()
}


async function threeKeysRoom () {
  const choices = [
    { title: 'Go to the fireplace', value: fireplace },
    { title: 'Open the door', value: monsterRoom },
    { title: 'Open the chest', value: openChest },
    { title: 'Go back to the last room', value: firstRoom },
  ]
  if (hasLeftKey === false) {
    choices.unshift({ title: 'Pickup left key', value: getsLeftKey })
  }
  if (hasMiddleKey === false) {
    choices.unshift({ title: 'Pickup middle key', value: getsMiddleKey })
  }
  if (hasRightKey === false) {
    choices.unshift({ title: 'Pickup right key', value: getsRightKey })
  }

  const { answer } = await prompts({
    type: 'select',
    name: 'answer',
    message: 'There are three keys on the table, behind the table you see a fireplace, a door, and a small chest. Which key do you pick up?',
    choices,
  })
  answer()
}

function getsLeftKey () {
  hasLeftKey = true
  console.log('You picked up the left key')
  threeKeysRoom()
}

function getsMiddleKey () {
  hasMiddleKey = true
  console.log('You picked up the left key')
  threeKeysRoom()
}

function getsRightKey () {
  hasRightKey = true
  console.log('You picked up the right key')
  threeKeysRoom()
}

function narrowBridge () {
  if (!hasTrollKey) {
    console.error('You try to cross the bridge but a troll appears and eats you. You are dead.')
    return
  }
  console.log('You use the troll head key to lower a narrow bridge into some lava and kill the troll. You then raise the bridge, walk across and marry the princess.')
}

function fireplace () {
  console.log('The fireplace is lit, you burn your hand. Ouch.')
  threeKeysRoom()
}

function monsterRoom () {
  if (!hasMiddleKey) {
    console.log('The door is locked, you cannot open it')
    return threeKeysRoom()
  }
  if (!hasSword) {
    console.error('You open the door and a monster eats you. You are dead.')
    return
  }
  hasTrollKey = true
  console.log('You open the door and a monster appears. You use your sword to slay the monster. You are victorious.')
  console.log('You find a key that the monster was guarding. It has a troll head on it. You take the key and go back into the room with a table.')
  threeKeysRoom()
}

function openChest () {
  if (hasSword) {
    console.log('You already have a sword, you do not need another one.')
    return threeKeysRoom()
  }
  if (!hasLeftKey) {
    console.log('The chest is locked, you cannot open it')
    return threeKeysRoom()
  }
  hasSword = true
  console.log('You open the chest and find a sword. You take it.')
  threeKeysRoom()

}


firstRoom()
