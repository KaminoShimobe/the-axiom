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

		
		
		
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Talk')
					.setStyle(ButtonStyle.Primary),
			);
		
		const rowD = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Talk')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(demonName)
			.setImage(`https://raw.githubusercontent.com/Squiddleton/Megaten/master/images/demons/`+ demon.devName +`.png`)
			.setDescription(demon.lore);

		await interaction.reply({ content: 'A Demon Appeared!', ephemeral: false, embeds: [embed], components: [row] });
		
		const filter = i => i.customId === 'primary' && i.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			await i.update({ content: 'You talked to the demon!', components: [rowD] });
		});

		collector.on('end', collected => interaction.update({ content: 'The Demon Fleed!', components: [rowD] }));

	},
};
