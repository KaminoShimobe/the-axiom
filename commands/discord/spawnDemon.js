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
					.setCustomId('attack')
					.setLabel('Attack')
					.setStyle(ButtonStyle.Danger),
				
				new ButtonBuilder()
					.setCustomId('talk')
					.setLabel('Talk')
					.setStyle(ButtonStyle.Primary),
				
				new ButtonBuilder()
					.setCustomId('items')
					.setLabel('Item')
					.setStyle(ButtonStyle.Secondary),
				
				new ButtonBuilder()
					.setCustomId('flee')
					.setLabel('Flee')
					.setStyle(ButtonStyle.Success),
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
		
		const filter = i => i.customId === 'talk' && i.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			await i.update({ content: 'You talked to the demon!', components: [rowD] });
		});
		
		const filter2 = j => j.customId === 'attack' && j.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter2, time: 15000 });

		collector.on('collect', async j => {
			await j.update({ content: 'You attacked the demon!', components: [rowD] });
		});
		
		const filter3 = k => k.customId === 'items' && k.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter3, time: 15000 });

		collector.on('collect', async k => {
			await k.update({ content: 'You used an item', components: [rowD] });
		});
		
		const filter4 = l => l.customId === 'flee' && l.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter4, time: 15000 });

		collector.on('collect', async l => {
			await l.update({ content: 'You talked to the demon!', components: [rowD] });
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));

// 		});

	},
};
