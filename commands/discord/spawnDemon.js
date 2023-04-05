const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, SlashCommandBuilder } = require('discord.js');
const { Demon, Skill} = require('megaten'); 
const fs = require('fs');
 



module.exports = {
	data: new SlashCommandBuilder()
		.setName('spawn')
		.setDescription('Spawns a demon!'),
	async execute(interaction) {
		const compendium = Demon.array;
		var random = Math.floor(Math.random() * compendium.length);
		var demon = compendium[random];
		var demonName = demon.toString();

		
		const atkButton = new ButtonBuilder()
					.setCustomId('attack')
					.setLabel('Attack')
					.setStyle(ButtonStyle.Danger);
		
		const talkButton = new ButtonBuilder()
					.setCustomId('talk')
					.setLabel('Talk')
					.setStyle(ButtonStyle.Primary);
		const itemButton = new ButtonBuilder()
					.setCustomId('items')
					.setLabel('Item')
					.setStyle(ButtonStyle.Secondary);
		
		const fleeButton = new ButtonBuilder()
					.setCustomId('flee')
					.setLabel('Flee')
					.setStyle(ButtonStyle.Success);
		
		
		const row = new ActionRowBuilder()
			.addComponents(
				atkButton, talkButton, itemButton, fleeButton
			);
		
		const rowD = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('attack')
					.setLabel('Attack')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(true),
				
				new ButtonBuilder()
					.setCustomId('talk')
					.setLabel('Talk')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				
				new ButtonBuilder()
					.setCustomId('items')
					.setLabel('Item')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
				
				new ButtonBuilder()
					.setCustomId('flee')
					.setLabel('Flee')
					.setStyle(ButtonStyle.Success)
					.setDisabled(true),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(demonName)
			.setImage(`https://raw.githubusercontent.com/Squiddleton/Megaten/master/images/demons/`+ demon.devName +`.png`)
			.setDescription(demon.lore);

		await interaction.reply({ content: 'A Demon Appeared!', ephemeral: false, embeds: [embed], components: [row] });
		
		const filter = (interaction) => {
		  return ['attack', 'talk', 'items', 'flee'].includes(interaction.customID);
		};
		
		
		const collectors = {};
		['attack', 'talk', 'items', 'flee'].forEach((customID) => {
		  collectors[customID] = new interaction.channel.createMessageComponentCollector(filter, { time: 10000 }); // 10 seconds
        });
		  // Listen for collect event
		  collectors[customID].on('collect', (interaction) => {
		    console.log(`Button ${interaction.customID} pressed!`);
		  });
			
			collectors[customID].on('end', (collected) => {
			    console.log(`Collected ${collected.size} items for button ${customID}.`);
			    const button = row.components.find((component) => component.customID === customID);
			    button.setLabel("Time's up!");
			    button.setStyle(MessageButtonStyles.DANGER);
			    interaction.update({ content: 'button was pressed!', components: [rowD] });
			  });
        
		//const filter = i => i.customId === 'talk' && i.user.id === '242118931769196544';

// 		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

// 		collector.on('collect', async i => {
// 			await i.update({ content: 'You talked to the demon!', components: [rowD] });
// 		});

// 		collector.on('end', collected =>
// 			     console.log(`Collected ${collected.size} items for button ${customID}.`)
// // 			     const button = actionRow.components.find((component) => component.customID === customID);
// //     				button.setLabel("Time's up!");
// //    				button.setStyle(MessageButtonStyles.DANGER);
// //     				message.edit('The time has run out:', { components: [actionRow] });
// 			    );

// 		});

	},
};
