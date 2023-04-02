const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, SlashCommandBuilder } = require('discord.js');
const { Demon, Skill} = require('megaten'); 


module.exports = {
	data: new SlashCommandBuilder()
		.setName('spawn')
		.setDescription('Spawns a demon!'),
	async execute(interaction) {
		const compendium = Demon.array;
		var random = Math.floor(Math.random() * compendium.length);
		var demon = compendium[random];
		console.log(demon.name);
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('MUITO REAL!')
					.setStyle(ButtonStyle.Primary),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Wilder Mothman')
			.setImage('https://static.wikia.nocookie.net/megamitensei/images/e/e0/Mothmanof.png/revision/latest?cb=20210912210516')
			.setDescription('MUITO REAL???');

		await interaction.reply({ content: 'A Demon Appeared!', ephemeral: false, embeds: [embed], components: [row] });
		
		const filter = i => i.customId === 'primary' && i.user.id === '242118931769196544';

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			await i.update({ content: 'So True!', components: [] });
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`));

	},
};
