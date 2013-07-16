﻿/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/**
 * @fileOverview Spell checker.
 */

// Register a plugin named "wsc".
CKEDITOR.plugins.add( 'wsc', {
	requires: 'dialog',
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh', // %REMOVE_LINE_CORE%
	icons: 'spellchecker', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	parseConfig: function(editor) {
		editor.config.wsc_onFinish = (typeof editor.config.wsc_onFinish === 'function') ? editor.config.wsc_onFinish : function() {};
		editor.config.wsc_onClose = (typeof editor.config.wsc_onClose === 'function') ? editor.config.wsc_onClose : function() {};

		CKEDITOR.config.wsc_stack.push(editor);
	},
	init: function( editor ) {
		var commandName = 'checkspell';

		var strNormalDialog = 'dialogs/wsc.js',
			strIeDialog = 'dialogs/wsc_ie.js',
			strDialog;


		var command = editor.addCommand( commandName, new CKEDITOR.dialogCommand( commandName ) );
		// SpellChecker doesn't work in Opera and with custom domain
		command.modes = { wysiwyg: ( !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname ) };

		if(typeof editor.plugins.scayt == 'undefined'){
			editor.ui.addButton && editor.ui.addButton( 'SpellChecker', {
				label: editor.lang.wsc.toolbar,
				command: commandName,
				toolbar: 'spellchecker,10'
			});
		}


		if ( CKEDITOR.env.ie && CKEDITOR.env.version <= 8 ){
			strDialog = strIeDialog;
		} else {
			if (!window.postMessage) {
				strDialog = strIeDialog;
			} else {
				strDialog = strNormalDialog;
			}
		}
		CKEDITOR.dialog.add( commandName, this.path + strDialog );
	},
	beforeInit: function( editor ) {
		var self = this;
		self.parseConfig(editor);
	}

});


CKEDITOR.config.wsc_stack = [];
CKEDITOR.config.wsc_customerId = CKEDITOR.config.wsc_customerId || '1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk';
CKEDITOR.config.wsc_customDictionaryIds = CKEDITOR.config.wsc_customDictionaryIds || '';
CKEDITOR.config.wsc_userDictionaryName = CKEDITOR.config.wsc_userDictionaryName || '';
CKEDITOR.config.wsc_cmd = CKEDITOR.config.wsc_cmd || 'spell'; // spell, thes or grammar. default tab


